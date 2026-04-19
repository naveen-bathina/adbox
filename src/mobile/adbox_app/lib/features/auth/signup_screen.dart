import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class SignupScreen extends StatefulWidget {
  const SignupScreen({Key? key}) : super(key: key);

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _ageController = TextEditingController();
  final _genderController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String _message = '';

  Future<void> _signup() async {
    setState(() {
      _message = '';
    });
    if (!_formKey.currentState!.validate()) return;
    final url = Uri.parse('http://localhost:5096/api/users/signup');
    try {
      final res = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body:
            '{"name":"${_nameController.text}","age":${_ageController.text},"gender":"${_genderController.text}","location":"","phone":"","email":"${_emailController.text}","password":"${_passwordController.text}"}',
      );
      if (res.statusCode == 200) {
        setState(() {
          _message = 'Signup successful!';
        });
      } else {
        setState(() {
          _message = 'Signup failed: ${res.body}';
        });
      }
    } catch (e) {
      setState(() {
        _message = 'Network error';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sign Up')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Name'),
                validator: (value) =>
                    value == null || value.isEmpty ? 'Name is required' : null,
              ),
              TextFormField(
                controller: _ageController,
                decoration: const InputDecoration(labelText: 'Age'),
                keyboardType: TextInputType.number,
                validator: (value) =>
                    value == null || value.isEmpty ? 'Age is required' : null,
              ),
              TextFormField(
                controller: _genderController,
                decoration: const InputDecoration(labelText: 'Gender'),
                validator: (value) => value == null || value.isEmpty
                    ? 'Gender is required'
                    : null,
              ),
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                keyboardType: TextInputType.emailAddress,
                validator: (value) =>
                    value == null || value.isEmpty ? 'Email is required' : null,
              ),
              TextFormField(
                controller: _passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) => value == null || value.isEmpty
                    ? 'Password is required'
                    : null,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _signup,
                child: const Text('Sign Up'),
              ),
              if (_message.isNotEmpty) ...[
                const SizedBox(height: 16),
                Text(_message),
              ]
            ],
          ),
        ),
      ),
    );
  }
}
