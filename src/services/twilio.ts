import axios from 'axios';
import {apiUrl, twilioSmsApi} from '../utils/api';

export const sendSmsVerification = (phone: any) => {
  const url = apiUrl + 'site/start-verify';
  const data = {
    to: phone,
    channel: 'sms',
  };

  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });
};

export const checkVerification = (phone: any, code: any) => {
  return axios.post(apiUrl + 'site/check-verify', {
    to: phone,
    code,
  });
};
