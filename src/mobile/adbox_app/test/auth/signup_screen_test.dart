import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:adbox_app/features/auth/signup_screen.dart';

void main() {
  testWidgets('Signup screen renders form fields', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: SignupScreen()));
    expect(
      find.byType(TextFormField),
      findsNWidgets(5),
    ); // name, age, gender, email, password
    expect(find.widgetWithText(ElevatedButton, 'Sign Up'), findsOneWidget);
  });
}
