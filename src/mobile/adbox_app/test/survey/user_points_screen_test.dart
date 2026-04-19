import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:adbox_app/features/survey/user_points_screen.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'dart:convert';

void main() {
  testWidgets('UserPointsScreen displays user points',
      (WidgetTester tester) async {
    final mockClient = MockClient((request) async {
      return http.Response(
          jsonEncode([
            {'userId': 'user1', 'points': 100},
            {'userId': 'user2', 'points': 50},
          ]),
          200);
    });
    await tester
        .pumpWidget(MaterialApp(home: UserPointsScreen(client: mockClient)));
    await tester.pumpAndSettle();
    expect(find.text('User Rewards / Points'), findsOneWidget);
    expect(find.text('user1'), findsOneWidget);
    expect(find.text('100'), findsOneWidget);
    expect(find.text('user2'), findsOneWidget);
    expect(find.text('50'), findsOneWidget);
  });

  testWidgets('UserPointsScreen shows error on failure',
      (WidgetTester tester) async {
    final mockClient = MockClient((request) async {
      return http.Response('fail', 500);
    });
    await tester
        .pumpWidget(MaterialApp(home: UserPointsScreen(client: mockClient)));
    await tester.pumpAndSettle();
    expect(find.textContaining('Failed to load user points'), findsOneWidget);
  });
}
