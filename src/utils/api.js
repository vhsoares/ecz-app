import {Platform} from 'react-native';

export const apiUrl = __DEV__
  ? Platform.OS === 'ios'
    ? 'http://localhost:3001'
    : 'http://10.0.2.2:3001/'
  : 'https://economizei.com/api/';
export const apiToken =
  'B3C2AE0A2E64FB586FEB92CFA53C623502305D2731537F396833DD2C101E25B5';
export const twilioSmsApi = 'https://verify-8951-4o9ohh.twil.io/';
