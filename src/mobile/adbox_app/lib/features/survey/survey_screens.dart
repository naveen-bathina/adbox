import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class SurveyListScreen extends StatefulWidget {
  const SurveyListScreen({Key? key}) : super(key: key);

  @override
  State<SurveyListScreen> createState() => _SurveyListScreenState();
}

class _SurveyListScreenState extends State<SurveyListScreen> {
  List<dynamic> surveys = [];
  bool loading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchSurveys();
  }

  Future<void> fetchSurveys() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final res =
          await http.get(Uri.parse('http://localhost:5000/api/admin/surveys'));
      if (res.statusCode == 200) {
        setState(() {
          surveys = jsonDecode(res.body);
        });
      } else {
        setState(() {
          error = 'Failed to load surveys';
        });
      }
    } catch (_) {
      setState(() {
        error = 'Network error';
      });
    } finally {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Surveys')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : error != null
              ? Center(
                  child:
                      Text(error!, style: const TextStyle(color: Colors.red)))
              : ListView.builder(
                  itemCount: surveys.length,
                  itemBuilder: (context, i) {
                    final s = surveys[i];
                    return ListTile(
                      title: Text(s['title'] ?? ''),
                      subtitle: Text(s['description'] ?? ''),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () async {
                          // Minimal delete logic: call API and remove from list
                          final res = await http.delete(Uri.parse('http://localhost:5000/api/admin/surveys/$i'));
                          if (res.statusCode == 204) {
                            setState(() {
                              surveys.removeAt(i);
                            });
                          }
                        },
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const SurveyCreateScreen()),
        ).then((_) => fetchSurveys()),
        child: const Icon(Icons.add),
      ),
    );
  }
}

class SurveyCreateScreen extends StatefulWidget {
  const SurveyCreateScreen({Key? key}) : super(key: key);

  @override
  State<SurveyCreateScreen> createState() => _SurveyCreateScreenState();
}

class _SurveyCreateScreenState extends State<SurveyCreateScreen> {
  final _formKey = GlobalKey<FormState>();
  String title = '';
  String description = '';
  bool loading = false;
  String? error;

  Future<void> createSurvey() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final res =
          await http.post(Uri.parse('http://localhost:5000/api/admin/surveys'),
              headers: {'Content-Type': 'application/json'},
              body: jsonEncode({
                'title': title,
                'description': description,
                'type': 'survey',
                'questions': [
                  {
                    'text': 'How satisfied are you?',
                    'type': 'rating',
                    'options': ['1', '2', '3', '4', '5']
                  }
                ]
              }));
      if (res.statusCode == 201) {
        Navigator.pop(context);
      } else {
        setState(() {
          error = 'Failed to create survey';
        });
      }
    } catch (_) {
      setState(() {
        error = 'Network error';
      });
    } finally {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Survey')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: const InputDecoration(labelText: 'Title'),
                onChanged: (v) => title = v,
                validator: (v) => v == null || v.isEmpty ? 'Required' : null,
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Description'),
                onChanged: (v) => description = v,
                validator: (v) => v == null || v.isEmpty ? 'Required' : null,
              ),
              if (error != null) ...[
                const SizedBox(height: 8),
                Text(error!, style: const TextStyle(color: Colors.red)),
              ],
              const SizedBox(height: 16),
              loading
                  ? const CircularProgressIndicator()
                  : ElevatedButton(
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          createSurvey();
                        }
                      },
                      child: const Text('Create'),
                    ),
            ],
          ),
        ),
      ),
    );
  }
}
