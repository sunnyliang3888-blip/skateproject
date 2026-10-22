import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() => runApp(const SkateTraceApp());

const ink = Color(0xFF183F48);
const teal = Color(0xFF227C80);
const muted = Color(0xFF71858A);
const ice = Color(0xFFF3F8F8);

class Session {
  Session(
    this.name,
    this.when,
    this.rink,
    this.minutes,
    this.jumps,
    this.laps, {
    this.recording = false,
    this.unsynced = false,
  });
  final String name, when, rink;
  final int minutes, jumps, laps;
  bool recording, unsynced;
  Map<String, Object> toJson() => {
    'name': name,
    'when': when,
    'rink': rink,
    'minutes': minutes,
    'jumps': jumps,
    'laps': laps,
    'recording': recording,
    'unsynced': unsynced,
  };
}

// In-memory fixtures. Replace this source with a repository when data is defined.
List<Session> sampleSessions() => [
  Session(
    'Tuesday Practice',
    'Today · 4:15 PM',
    'Cottonwood Rink',
    42,
    18,
    7,
    recording: true,
  ),
  Session(
    'Saturday Freestyle',
    'Sat, Aug 30 · 8:00 AM',
    'Cottonwood Rink',
    55,
    24,
    11,
  ),
  Session(
    'Edge Drills',
    'Thu, Aug 28 · 5:30 PM',
    'Cottonwood Rink',
    31,
    4,
    9,
    unsynced: true,
  ),
  Session(
    'Tuesday Practice',
    'Tue, Aug 26 · 4:15 PM',
    'Cottonwood Rink',
    44,
    16,
    8,
  ),
  Session(
    'Competition Warm-up',
    'Sun, Aug 24 · 7:00 AM',
    'Provo Ice',
    26,
    11,
    5,
  ),
];

class SkateTraceApp extends StatelessWidget {
  const SkateTraceApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'SkateTrace',
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: ice,
      colorScheme: ColorScheme.fromSeed(
        seedColor: teal,
        primary: teal,
        surface: Colors.white,
      ),
      textTheme: ThemeData.light().textTheme.apply(
        bodyColor: ink,
        displayColor: ink,
      ),
      dividerColor: const Color(0xFFE2ECEC),
    ),
    home: const SkateHome(),
  );
}

class SkateHome extends StatefulWidget {
  const SkateHome({super.key});
  @override
  State<SkateHome> createState() => _SkateHomeState();
}

class _SkateHomeState extends State<SkateHome> {
  final sessions = sampleSessions();
  int tab = 0;
  bool manage = false;
  bool reminders = true;
  int get pending => sessions.where((s) => s.unsynced).length;
  void message(String text) =>
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(text)));

  Future<void> details(Session s) async {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      backgroundColor: ice,
      builder: (context) => StatefulBuilder(
        builder: (context, refresh) => SafeArea(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(24, 8, 24, 28),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'SESSION OVERVIEW',
                    style: TextStyle(
                      color: teal,
                      letterSpacing: 2,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    s.name,
                    style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Text(
                    '${s.when} · ${s.rink}',
                    style: const TextStyle(color: muted),
                  ),
                  const SizedBox(height: 24),
                  Center(
                    child: SizedBox(
                      width: 230,
                      height: 220,
                      child: CustomPaint(painter: RinkPainter(0)),
                    ),
                  ),
                  const SizedBox(height: 24),
                  metrics(s),
                  const SizedBox(height: 22),
                  Text(
                    s.recording
                        ? 'Recording preview · sample sensor data'
                        : 'Saved session · sample data',
                    style: const TextStyle(color: muted),
                  ),
                  if (s.recording)
                    Padding(
                      padding: const EdgeInsets.only(top: 16),
                      child: FilledButton.icon(
                        onPressed: () {
                          setState(() {
                            s.recording = false;
                            s.unsynced = true;
                          });
                          refresh(() {});
                        },
                        icon: const Icon(Icons.stop_rounded),
                        label: const Text('Finish session'),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void start() {
    final active = sessions.where((s) => s.recording);
    if (active.isNotEmpty) {
      details(active.first);
      return;
    }
    final s = Session(
      'New Practice',
      'Today · Just now',
      'Cottonwood Rink',
      0,
      0,
      0,
      recording: true,
    );
    setState(() => sessions.insert(0, s));
    details(s);
  }

  Widget metrics(Session s) => Row(
    mainAxisAlignment: MainAxisAlignment.spaceAround,
    children: [
      for (final entry in [
        (s.minutes, 'MINUTES'),
        (s.jumps, 'JUMPS'),
        (s.laps, 'LAPS'),
      ])
        Column(
          children: [
            Text(
              '${entry.$1}',
              style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
            ),
            Text(
              entry.$2,
              style: const TextStyle(
                fontSize: 10,
                letterSpacing: 1.5,
                color: muted,
              ),
            ),
          ],
        ),
    ],
  );

  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: const Color(0xFFE5EEEE),
    body: Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 520),
        child: Scaffold(
          body: SafeArea(
            bottom: false,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(24, 18, 24, 0),
                  child: Row(
                    children: [
                      const Icon(Icons.blur_on_rounded, color: teal, size: 25),
                      const SizedBox(width: 8),
                      const Text(
                        'skatetrace',
                        style: TextStyle(
                          fontSize: 19,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -.7,
                        ),
                      ),
                      const Spacer(),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 9,
                          vertical: 5,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFE4EEEE),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text(
                          'MOCKUP',
                          style: TextStyle(
                            fontSize: 9,
                            letterSpacing: 1.4,
                            color: muted,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: IndexedStack(
                    index: tab,
                    children: [
                      sessionsPage(),
                      bladePage(),
                      progressPage(),
                      settingsPage(),
                    ],
                  ),
                ),
              ],
            ),
          ),
          bottomNavigationBar: NavigationBar(
            height: 76,
            selectedIndex: tab,
            backgroundColor: Colors.white,
            indicatorColor: const Color(0xFFDDEFEF),
            onDestinationSelected: (value) => setState(() => tab = value),
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.radio_button_checked),
                label: 'Sessions',
              ),
              NavigationDestination(
                icon: Icon(Icons.route_outlined),
                label: 'Blade Path',
              ),
              NavigationDestination(
                icon: Icon(Icons.bar_chart_rounded),
                label: 'Progress',
              ),
              NavigationDestination(
                icon: Icon(Icons.tune_rounded),
                label: 'Settings',
              ),
            ],
          ),
        ),
      ),
    ),
  );

  Widget heading(String title, String eyebrow) => Padding(
    padding: const EdgeInsets.only(top: 28, bottom: 24),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          eyebrow,
          style: const TextStyle(color: muted, fontSize: 12, letterSpacing: .4),
        ),
        const SizedBox(height: 5),
        Text(
          title,
          style: const TextStyle(
            fontSize: 36,
            fontWeight: FontWeight.w700,
            letterSpacing: -1.4,
          ),
        ),
      ],
    ),
  );

  Widget sessionsPage() => ListView(
    padding: const EdgeInsets.symmetric(horizontal: 24),
    children: [
      heading('Sessions', 'ELLA R.  /  LEVEL 4'),
      Material(
        color: ink,
        borderRadius: BorderRadius.circular(18),
        child: InkWell(
          onTap: start,
          borderRadius: BorderRadius.circular(18),
          child: const Padding(
            padding: EdgeInsets.all(20),
            child: Row(
              children: [
                Icon(
                  Icons.add_circle_outline,
                  color: Color(0xFFAEE8DC),
                  size: 32,
                ),
                SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Start new session',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(height: 5),
                      Text(
                        'Both sensors connected · ready to record',
                        style: TextStyle(
                          color: Color(0xFFBCD2D5),
                          fontSize: 11,
                          height: 1.5,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(Icons.arrow_forward, size: 19, color: Colors.white),
              ],
            ),
          ),
        ),
      ),
      const SizedBox(height: 14),
      Row(
        children: [
          Expanded(
            child: device(
              'Skate module',
              '84%',
              'Ice temp + IMU',
              Icons.sensors,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: device('Blade unit', '71%', 'GPS + IMU', Icons.gps_fixed),
          ),
        ],
      ),
      const SizedBox(height: 24),
      Row(
        children: [
          const Text(
            'Recent',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
          ),
          const Spacer(),
          TextButton(
            onPressed: () => setState(() => manage = !manage),
            child: Text(manage ? 'Done' : 'Manage'),
          ),
        ],
      ),
      const SizedBox(height: 8),
      if (sessions.isEmpty)
        const Padding(
          padding: EdgeInsets.all(24),
          child: Text('No sessions yet. Start a new practice.'),
        ),
      for (int i = 0; i < sessions.length; i++) sessionRow(sessions[i], i),
      const SizedBox(height: 24),
      Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: const Color(0xFFE2ECEC)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.phone_iphone, size: 18, color: muted),
                SizedBox(width: 8),
                Text(
                  'On this phone',
                  style: TextStyle(fontWeight: FontWeight.w600),
                ),
                Spacer(),
                Text(
                  'DEMO STORAGE',
                  style: TextStyle(fontSize: 9, color: muted, letterSpacing: 1),
                ),
              ],
            ),
            const SizedBox(height: 18),
            ClipRRect(
              borderRadius: BorderRadius.circular(5),
              child: LinearProgressIndicator(
                value: sessions.length / 20,
                minHeight: 5,
                backgroundColor: ice,
                color: teal,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              '${sessions.length} sample sessions · $pending waiting to sync',
              style: const TextStyle(color: muted, fontSize: 12),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                OutlinedButton(
                  onPressed: pending == 0
                      ? null
                      : () {
                          setState(() {
                            for (final s in sessions) {
                              s.unsynced = false;
                            }
                          });
                          message('Demo sync complete. No server connected.');
                        },
                  child: const Text('Sync now'),
                ),
                const SizedBox(width: 10),
                TextButton.icon(
                  onPressed: export,
                  icon: const Icon(Icons.ios_share, size: 16),
                  label: const Text('Export all'),
                ),
              ],
            ),
          ],
        ),
      ),
      const SizedBox(height: 28),
    ],
  );

  Widget device(
    String name,
    String battery,
    String type,
    IconData icon,
  ) => Container(
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      border: Border.all(color: const Color(0xFFDCE7E7)),
      borderRadius: BorderRadius.circular(14),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, size: 18, color: teal),
            const Spacer(),
            Text(battery, style: const TextStyle(fontSize: 11, color: muted)),
            const SizedBox(width: 3),
            const Icon(Icons.battery_5_bar, size: 14, color: teal),
          ],
        ),
        const SizedBox(height: 12),
        Text(
          name,
          style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
        ),
        const SizedBox(height: 5),
        const Text('● Connected', style: TextStyle(color: teal, fontSize: 11)),
        const SizedBox(height: 3),
        Text(type, style: const TextStyle(color: muted, fontSize: 11)),
      ],
    ),
  );

  Widget sessionRow(Session s, int index) => Padding(
    padding: const EdgeInsets.only(bottom: 8),
    child: Material(
      color: s.recording ? const Color(0xFFE8F2F0) : Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(
          color: s.recording
              ? const Color(0xFFC8DFD9)
              : const Color(0xFFE5EDED),
        ),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () => details(s),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
          child: Row(
            children: [
              SizedBox(
                width: 48,
                height: 56,
                child: CustomPaint(painter: RinkPainter(index)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      s.name,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    if (s.recording || s.unsynced)
                      Padding(
                        padding: const EdgeInsets.only(top: 4),
                        child: Text(
                          s.recording ? '● RECORDING' : '○ NOT SYNCED',
                          style: TextStyle(
                            fontSize: 8,
                            letterSpacing: 1,
                            fontWeight: FontWeight.w700,
                            color: s.recording ? teal : const Color(0xFFB17C39),
                          ),
                        ),
                      ),
                    const SizedBox(height: 5),
                    Text(
                      '${s.when} · ${s.rink}',
                      style: const TextStyle(
                        fontSize: 10,
                        height: 1.5,
                        color: muted,
                      ),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      '${s.minutes} min  ·  ${s.jumps} jumps  ·  ${s.laps} laps',
                      style: const TextStyle(fontSize: 11, color: ink),
                    ),
                  ],
                ),
              ),
              if (manage)
                IconButton(
                  tooltip: 'Remove sample session',
                  icon: const Icon(Icons.remove_circle_outline, color: muted),
                  onPressed: () => setState(() => sessions.remove(s)),
                )
              else
                const Icon(Icons.chevron_right, color: muted, size: 18),
            ],
          ),
        ),
      ),
    ),
  );

  void export() {
    final json = const JsonEncoder.withIndent('  ')
        .convert(sessions.map((s) => s.toJson()).toList());
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      builder: (context) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Export sample sessions',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 16),
              SizedBox(
                height: 240,
                child: SingleChildScrollView(
                  child: SelectableText(
                    json,
                    style: const TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 12,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              FilledButton.icon(
                onPressed: () async {
                  await Clipboard.setData(ClipboardData(text: json));
                  if (!mounted) {
                    return;
                  }
                  message('Sample JSON copied to clipboard.');
                },
                icon: const Icon(Icons.copy),
                label: const Text('Copy JSON'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget bladePage() => ListView(
    padding: const EdgeInsets.symmetric(horizontal: 24),
    children: [
      heading('Blade Path', 'EVERY EDGE TELLS A STORY'),
      const Text(
        'Tuesday Practice',
        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
      ),
      const Text(
        'Cottonwood Rink · illustrative route',
        style: TextStyle(color: muted),
      ),
      const SizedBox(height: 28),
      AspectRatio(
        aspectRatio: .95,
        child: CustomPaint(painter: RinkPainter(0)),
      ),
      const SizedBox(height: 24),
      const Text(
        '● Outside edge',
        textAlign: TextAlign.center,
        style: TextStyle(color: teal),
      ),
      const SizedBox(height: 20),
      const Text(
        'A preview of your path on the ice. Real GPS and IMU data will be connected in a later step.',
        style: TextStyle(color: muted, height: 1.6),
      ),
    ],
  );

  Widget progressPage() => ListView(
    padding: const EdgeInsets.symmetric(horizontal: 24),
    children: [
      heading('Progress', 'A LITTLE BETTER, EVERY SESSION'),
      const Text(
        'Your recent practice',
        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
      ),
      const SizedBox(height: 24),
      metrics(
        Session(
          '',
          '',
          '',
          sessions.fold(0, (a, s) => a + s.minutes),
          sessions.fold(0, (a, s) => a + s.jumps),
          sessions.fold(0, (a, s) => a + s.laps),
        ),
      ),
      const SizedBox(height: 36),
      const Text(
        'Time on the ice',
        style: TextStyle(fontWeight: FontWeight.w600),
      ),
      const SizedBox(height: 18),
      for (final s in sessions.reversed)
        Padding(
          padding: const EdgeInsets.only(bottom: 18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${s.name} · ${s.minutes} min',
                style: const TextStyle(fontSize: 12, color: muted),
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(5),
                child: LinearProgressIndicator(
                  value: s.minutes / 60,
                  minHeight: 12,
                  backgroundColor: const Color(0xFFDFEAEA),
                ),
              ),
            ],
          ),
        ),
      const Text('Based on sample sessions.', style: TextStyle(color: muted)),
    ],
  );

  Widget settingsPage() => ListView(
    padding: const EdgeInsets.symmetric(horizontal: 24),
    children: [
      heading('Settings', 'MAKE IT YOURS'),
      const ListTile(
        contentPadding: EdgeInsets.zero,
        leading: CircleAvatar(
          backgroundColor: Color(0xFFDDEFEF),
          child: Text('ER'),
        ),
        title: Text('Ella R.'),
        subtitle: Text('Level 4 · Sample profile'),
      ),
      const Divider(height: 32),
      SwitchListTile(
        contentPadding: EdgeInsets.zero,
        title: const Text('Practice reminders'),
        subtitle: const Text('Preview preference only'),
        value: reminders,
        onChanged: (v) => setState(() => reminders = v),
      ),
      const Divider(height: 32),
      const Text(
        'About this mockup',
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
      ),
      const SizedBox(height: 12),
      const Text(
        'SkateTrace for web and iPhone. Sensors, recordings, storage and sync are simulated. Changes reset when the app restarts.',
        style: TextStyle(color: muted, height: 1.7),
      ),
    ],
  );
}

class RinkPainter extends CustomPainter {
  RinkPainter(this.variant);
  final int variant;
  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(size.width / 60, size.height / 60);
    final rink = RRect.fromRectAndRadius(
      const Rect.fromLTWH(3, 3, 54, 54),
      const Radius.circular(18),
    );
    canvas.drawRRect(rink, Paint()..color = const Color(0xFFF7FBFB));
    canvas.drawRRect(
      rink,
      Paint()
        ..color = const Color(0xFFD7E6E6)
        ..style = PaintingStyle.stroke
        ..strokeWidth = .8,
    );
    canvas.drawLine(
      const Offset(4, 30),
      const Offset(56, 30),
      Paint()
        ..color = const Color(0xFFE3ECEC)
        ..strokeWidth = .6,
    );
    canvas.drawCircle(
      const Offset(30, 30),
      7,
      Paint()
        ..color = const Color(0xFFE3ECEC)
        ..style = PaintingStyle.stroke
        ..strokeWidth = .6,
    );
    final path = Path();
    switch (variant % 5) {
      case 0:
        path.moveTo(18, 46);
        path.cubicTo(10, 32, 16, 16, 30, 14);
        path.cubicTo(44, 12, 50, 24, 44, 40);
      case 1:
        path.moveTo(16, 40);
        path.cubicTo(14, 20, 30, 10, 42, 20);
        path.cubicTo(54, 30, 44, 44, 26, 46);
      case 2:
        path.moveTo(20, 48);
        path.cubicTo(8, 34, 18, 14, 34, 16);
        path.cubicTo(50, 18, 48, 34, 38, 46);
      case 3:
        path.moveTo(14, 36);
        path.cubicTo(20, 16, 40, 12, 46, 28);
        path.cubicTo(52, 44, 30, 52, 20, 44);
      case 4:
        path.moveTo(22, 46);
        path.cubicTo(12, 30, 20, 14, 34, 18);
        path.cubicTo(48, 22, 46, 38, 32, 48);
    }
    canvas.drawPath(
      path,
      Paint()
        ..color = teal
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..strokeCap = StrokeCap.round,
    );
    canvas.restore();
  }

  @override
  bool shouldRepaint(RinkPainter oldDelegate) => oldDelegate.variant != variant;
}
