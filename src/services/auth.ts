import axios from 'axios';
import {apiToken, apiUrl} from '../utils/api';

export const createUser = (user: any) => {
  if (__DEV__) {
    console.log(user, apiUrl);
  }
  return axios.post(
    apiUrl + 'user',
    {...user, role: 'Usuario'},
    {
      headers: {
        'x-access-token': apiToken,
      },
    },
  );
};
export const signIn = (user: any) => {
  if (__DEV__) {
    console.log(user, apiUrl);
  }

  return axios.post(apiUrl + 'authenticate/login-app', user, {
    headers: {
      'x-access-token': apiToken,
    },
  });
};
