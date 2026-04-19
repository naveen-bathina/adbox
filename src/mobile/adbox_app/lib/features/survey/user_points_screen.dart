import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class UserPointsScreen extends StatefulWidget {
  final http.Client? client;
  const UserPointsScreen({Key? key, this.client}) : super(key: key);

  @override
  State<UserPointsScreen> createState() => _UserPointsScreenState();
}

class _UserPointsScreenState extends State<UserPointsScreen> {
  List<dynamic> userPoints = [];
  bool loading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchUserPoints();
  }

  Future<void> fetchUserPoints() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final client = widget.client ?? http.Client();
      final res = await client
          .get(Uri.parse('http://localhost:5000/api/admin/user-points'));
      if (res.statusCode == 200) {
        setState(() {
          userPoints = jsonDecode(res.body);
        });
      } else {
        setState(() {
          error = 'Failed to load user points';
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
      appBar: AppBar(title: const Text('User Rewards / Points')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : error != null
              ? Center(
                  child:
                      Text(error!, style: const TextStyle(color: Colors.red)))
              : userPoints.isEmpty
                  ? const Center(child: Text('No user points found.'))
                  : ListView(
                      children: [
                        DataTable(
                          columns: const [
                            DataColumn(label: Text('User ID')),
                            DataColumn(label: Text('Points')),
                          ],
                          rows: userPoints
                              .map<DataRow>((u) => DataRow(cells: [
                                    DataCell(Text(u['userId'].toString())),
                                    DataCell(Text(u['points'].toString())),
                                  ]))
                              .toList(),
                        ),
                      ],
                    ),
    );
  }
}
