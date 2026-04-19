import 'package:flutter_test/flutter_test.dart';
import 'package:adbox_app/features/survey/survey_screens.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'dart:convert';

void main() {
  testWidgets('user can create a survey (with mock)',
      (WidgetTester tester) async {
    bool surveyCreated = false;
    final mockClient = MockClient((request) async {
      if (request.method == 'POST' && request.url.path.endsWith('/surveys')) {
        surveyCreated = true;
        return http.Response('', 201);
      }
      return http.Response('Not Found', 404);
    });

    await tester
        .pumpWidget(MaterialApp(home: SurveyCreateScreen(client: mockClient)));
    await tester.enterText(find.byType(TextFormField).at(0), 'New Survey');
    await tester.enterText(
        find.byType(TextFormField).at(1), 'Survey Description');
    await tester.tap(find.text('Create'));
    await tester.pumpAndSettle();

    // After tapping create, surveyCreated should be true
    expect(surveyCreated, isTrue);
  });
}
