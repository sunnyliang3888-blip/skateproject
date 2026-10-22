# SkateTrace

Flutter mockup based on the original `index.html`. The reference stylesheet and linked pages were not provided, so the Flutter app supplies an ice-blue visual design and companion preview screens. The original HTML is preserved.

## Preview in Chrome

```sh
flutter pub get
flutter run -d chrome --web-port 7357
```

## Run on an iPhone later

Install and initialize the full Xcode application, connect an iPhone with Developer Mode enabled, and configure your Apple development team/signing in `ios/Runner.xcworkspace`. Then run:

```sh
flutter devices
flutter run -d <iphone-device-id>
```

The current machine's Flutter doctor reports incomplete Xcode setup. Native iOS has not been built or device-tested yet. The generated bundle identifier is a development placeholder; configure your own before distribution.

## Mock behavior

- Sessions, sensor connection state, battery values and routes are sample data.
- Start opens the currently recording session, or creates a new sample session when none is recording. Finish marks it as waiting to sync; no timer or sensor recording runs.
- Manage removes sample sessions from memory. Sync clears their pending flags locally.
- Export shows the current sessions as JSON, with a clipboard copy action.
- Progress totals the sample sessions. Blade Path shows an illustrative route.
- Preferences and all edits reset on restart. No backend, Bluetooth, GPS, persistence or actual notifications are connected.
- The storage card reports the five supplied sessions rather than the HTML's inconsistent count of fourteen.

`lib/main.dart` contains the session model, fixtures and UI. When data requirements are agreed, extract a repository and replace the fixtures with the real source.

## Checks

```sh
flutter analyze
flutter test
```

Widget tests cover finishing/starting a recording and tab navigation at an iPhone-sized viewport.
