# Mobile App (Flutter)

## Setup Steps

1. Initialize Flutter project: flutter create adbox_app
2. Set up folder structure for features, screens, and tests
3. Scaffold minimal signup/login screen (TDD: first test = renders signup form)

## Example Directory Structure

src/mobile/adbox_app/
├── lib/
│   ├── main.dart
│   ├── features/
│   │   ├── auth/
│   │   │   ├── signup_screen.dart
│   │   │   └── login_screen.dart
│   └── ...
├── test/
│   ├── auth/
│   │   └── signup_screen_test.dart
│   └── ...
├── pubspec.yaml

## Next Steps

- Run: flutter create adbox_app
- Write first widget test: renders signup form
