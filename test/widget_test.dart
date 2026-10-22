import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:skate_trace/main.dart';

void main() {
  testWidgets('Session recording can finish and a new session can start', (
    tester,
  ) async {
    await tester.pumpWidget(const SkateTraceApp());
    await tester.tap(find.text('Start new session'));
    await tester.pumpAndSettle();
    expect(find.text('SESSION OVERVIEW'), findsOneWidget);
    await tester.ensureVisible(find.text('Finish session'));
    await tester.tap(find.text('Finish session'));
    await tester.pumpAndSettle();
    expect(find.text('Saved session · sample data'), findsOneWidget);
    Navigator.of(tester.element(find.text('SESSION OVERVIEW'))).pop();
    await tester.pumpAndSettle();
    await tester.tap(find.text('Start new session'));
    await tester.pumpAndSettle();
    expect(find.text('New Practice'), findsWidgets);
  });

  testWidgets('Small iPhone layout and navigation render without overflow', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(const SkateTraceApp());
    expect(tester.takeException(), isNull);
    for (final label in ['Blade Path', 'Progress', 'Settings', 'Sessions']) {
      await tester.tap(find.widgetWithText(NavigationDestination, label));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    }
  });
}
