# Society ERP Mobile App

A React Native mobile application for apartment residents to manage their bills, payments, and society interactions.

## Features

- **Dashboard**: Overview of payment status and recent transactions
- **Bill Management**: View current bills and payment history
- **Secure Payments**: UPI integration for quick payments
- **Profile Management**: Update personal information and settings
- **Push Notifications**: Real-time updates for bills and announcements

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Navigate to the mobile app directory:
   ```bash
   cd mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Use Expo Go app on your phone to scan the QR code, or:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

### Building for Production

#### Android APK
```bash
expo build:android
```

#### iOS App Store
```bash
expo build:ios
```

### Configuration

Update the following files for your society:

1. **app.json**: Update app name, bundle identifiers
2. **app/login.tsx**: Configure authentication endpoints
3. **API endpoints**: Update base URL in API calls

## Architecture

- **Framework**: Expo with React Native
- **Navigation**: Expo Router
- **UI Components**: React Native Paper
- **State Management**: React Hooks
- **Authentication**: JWT tokens with secure storage

## Security Features

- Secure token storage
- Biometric authentication support
- SSL/TLS encryption for API calls
- Input validation and sanitization

## Deployment

### Google Play Store
1. Build signed APK using Expo
2. Upload to Google Play Console
3. Configure app listing and metadata

### Apple App Store
1. Build iOS app using Expo
2. Upload to App Store Connect
3. Submit for review

## Support

For technical support or feature requests, contact:
- Email: support@yoursociety.com
- Phone: +91 XXXXX XXXXX