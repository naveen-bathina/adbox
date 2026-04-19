import 'package:flutter/material.dart';
import 'features/auth/signup_screen.dart';
import 'features/auth/login_screen.dart';
import 'features/survey/survey_screens.dart';
import 'features/survey/user_points_screen.dart';

void main() {
  runApp(const AdBoxApp());
}

class AdBoxApp extends StatelessWidget {
  const AdBoxApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AdBox',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const AuthSwitcher(),
    );
  }
}

class AuthSwitcher extends StatefulWidget {
  const AuthSwitcher({Key? key}) : super(key: key);

  @override
  State<AuthSwitcher> createState() => _AuthSwitcherState();
}

class _AuthSwitcherState extends State<AuthSwitcher> {
  bool showLogin = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AdBox Auth')),
      body: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const SurveyListScreen()),
                  );
                },
                child: const Text('Go to Surveys'),
              ),
              const SizedBox(width: 16),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const UserPointsScreen()),
                  );
                },
                child: const Text('User Rewards'),
              ),
                onPressed: () => setState(() => showLogin = true),
                child: const Text('Login'),
              ),
              const SizedBox(width: 16),
              ElevatedButton(
                onPressed: () => setState(() => showLogin = false),
                child: const Text('Sign Up'),
              ),
            ],
          ),
          Expanded(
            child: showLogin ? const LoginScreen() : const SignupScreen(),
          ),
        ],
      ),
    );
  }
}
