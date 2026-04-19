import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String _message = '';

  Future<void> _login() async {
    setState(() {
      _message = '';
    });
    if (!_formKey.currentState!.validate()) return;
    final url = Uri.parse('http://localhost:5096/api/users/login');
    try {
      final res = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body:
            '{"email":"${_emailController.text}","password":"${_passwordController.text}"}',
      );
      if (res.statusCode == 200) {
        setState(() {
          _message = 'Login successful!';
        });
      } else {
        setState(() {
          _message = 'Login failed: ${res.body}';
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
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
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
                onPressed: _login,
                child: const Text('Login'),
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
