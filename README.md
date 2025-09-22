# Aircraft Block Logs

A React Native Expo app for logging aircraft block-in/out times, capturing photos, and generating comprehensive reports for aviation professionals.

## Overview

Aircraft Block Logs is designed specifically for aviation professionals who need to track aircraft movements, document conditions with photos, and generate regulatory-compliant reports. The app provides accurate timing, photo documentation, and comprehensive reporting capabilities.

## Features

- ✈️ **Block Time Tracking**: Accurate recording of aircraft block-in and block-out times
- 📸 **Photo Documentation**: Capture and store photos during block operations
- 📋 **Comprehensive Forms**: Detailed flight information collection
- 📍 **Location Tracking**: GPS coordinates for block-in/out locations
- ✍️ **Digital Signatures**: Capture signatures for report validation
- 📊 **Report Generation**: Export logs in PDF, DOCX, and CSV formats
- 🔍 **Search & Filter**: Easily find and organize your logs
- 💾 **Local Storage**: All data stored securely on your device
- 🔄 **Data Export/Import**: Backup and restore your logs

## Technology Stack

- **React Native** with **Expo** (managed workflow)
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Paper** for Material Design UI
- **Expo Camera** for photo capture
- **Expo Location** for GPS tracking
- **Expo FileSystem** for file operations
- **React Native Signature Canvas** for signatures

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── BlockTimer.tsx   # Timer and block-in/out controls
│   ├── CameraCapture.tsx # Camera functionality
│   ├── FormSheet.tsx    # Flight details form
│   ├── ReviewShare.tsx  # Review and export interface
│   └── SignaturePad.tsx # Digital signature capture
├── screens/             # App screens
│   ├── HomeScreen.tsx
│   ├── BlockInCameraScreen.tsx
│   ├── FormScreen.tsx
│   ├── BlockOutCameraScreen.tsx
│   ├── ReviewShareScreen.tsx
│   ├── LogsListScreen.tsx
│   ├── SettingsScreen.tsx
│   └── HelpScreen.tsx
├── models/              # Data models and interfaces
│   ├── Job.ts          # Job/flight log data model
│   └── Storage.ts      # Storage service interface
├── utils/               # Utility functions
│   ├── permissions.ts  # Camera and location permissions
│   ├── time.ts         # Date/time formatting utilities
│   ├── strings.ts      # App text strings
│   ├── docxExport.ts   # Document export functionality
│   ├── csvExport.ts    # CSV export functionality
│   └── ocr.ts          # OCR functionality (planned)
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx
└── App.tsx             # Main app entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/offgrid-glitch/aircraft-block-logs.git
   cd aircraft-block-logs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on a device:**
   - **iOS:** Press `i` in the terminal or scan the QR code with the Camera app
   - **Android:** Press `a` in the terminal or scan the QR code with the Expo Go app
   - **Web:** Press `w` in the terminal to open in browser

### Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Usage

### Basic Workflow

1. **Start a New Log:**
   - Tap "Start New Log" on the home screen
   - The app will request camera and location permissions

2. **Block In:**
   - Capture a photo when the aircraft blocks in
   - The app automatically records the timestamp and location

3. **Fill Flight Details:**
   - Complete the comprehensive flight information form
   - All fields are optional except tail number and pilot name

4. **Block Out:**
   - Capture a photo when the aircraft blocks out
   - The app records the timestamp and calculates total block time

5. **Review and Export:**
   - Review all captured information
   - Add a digital signature if required
   - Export in your preferred format (PDF, DOCX, CSV)

### Permissions Required

- **Camera**: For capturing documentation photos
- **Location**: For recording GPS coordinates of block locations
- **Storage**: For saving photos and exporting reports

## Development Status

### Implemented ✅
- Project structure and navigation
- UI components and screens
- Data models and interfaces
- Basic utilities and permissions
- TypeScript configuration
- Expo configuration

### In Development 🚧
- Local storage implementation (SQLite)
- Photo capture and storage
- Report generation (PDF/DOCX)
- OCR functionality for auto-filling forms

### Planned 📋
- Cloud backup and sync
- Multi-user support
- Advanced reporting features
- Integration with aviation databases
- Offline OCR capabilities

## Configuration

The app is configured for the Expo managed workflow with the following key configurations:

- **Camera**: Configured for photo capture with appropriate permissions
- **Location**: Set up for foreground location access
- **File System**: Prepared for local file storage and exports
- **Navigation**: Stack and tab navigation structure

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, bug reports, or feature requests:
- Email: support@aircraftblocklogs.com
- GitHub Issues: [Create an issue](https://github.com/offgrid-glitch/aircraft-block-logs/issues)

## Acknowledgments

- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
- UI components from [React Native Paper](https://callstack.github.io/react-native-paper/)
- Icons from [Expo Vector Icons](https://docs.expo.dev/guides/icons/)

---

**Note:** This app is designed for aviation professionals and should be used in accordance with relevant aviation regulations and company policies.