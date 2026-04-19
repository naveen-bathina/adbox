import 'package:flutter_test/flutter_test.dart';
import 'package:adbox_app/features/survey/survey_screens.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'dart:convert';

void main() {
  testWidgets('user can delete a survey from the list (with mock)',
      (WidgetTester tester) async {
    // Mock client returns a survey list, then success for delete
    final mockClient = MockClient((request) async {
      if (request.method == 'GET' && request.url.path.endsWith('/surveys')) {
        return http.Response(
            jsonEncode([
              {'title': 'Test Survey', 'description': 'Desc', 'id': 1},
              {'title': 'Another Survey', 'description': 'Desc2', 'id': 2},
            ]),
            200);
      }
      if (request.method == 'DELETE' &&
          request.url.path.contains('/surveys/')) {
        return http.Response('', 204);
      }
      return http.Response('Not Found', 404);
    });

    await tester
        .pumpWidget(MaterialApp(home: SurveyListScreen(client: mockClient)));
    await tester.pumpAndSettle();

    // Should find both surveys
    expect(find.text('Test Survey'), findsOneWidget);
    expect(find.text('Another Survey'), findsOneWidget);

    // Tap delete on the first survey
    final deleteButtons = find.byIcon(Icons.delete);
    expect(deleteButtons, findsNWidgets(2));
    await tester.tap(deleteButtons.first);
    await tester.pumpAndSettle();

    // The first survey should be removed
    expect(find.text('Test Survey'), findsNothing);
    expect(find.text('Another Survey'), findsOneWidget);
  });
}
