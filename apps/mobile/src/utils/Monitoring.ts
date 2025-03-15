// src/utils/Monitoring.ts
import * as Sentry from 'sentry-expo';
import { LogBox } from 'react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  enableInExpoDevelopment: true,
});

LogBox.ignoreLogs(['Setting a timer']); // Filter common warnings