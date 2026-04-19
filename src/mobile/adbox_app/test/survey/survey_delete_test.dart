import 'package:flutter_test/flutter_test.dart';
import 'package:adbox_app/features/survey/survey_screens.dart';
import 'package:flutter/material.dart';

void main() {
  testWidgets('checks for the presence of the survey list screen',
      (WidgetTester tester) async {
    // Just verify the basic structure load
    await tester.pumpWidget(const MaterialApp(home: SurveyListScreen()));

    // Check if the title is correctly set in the AppBar
    expect(find.text('Surveys'), findsOneWidget);

    // Initially, it should be in a loading state
    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });
}
