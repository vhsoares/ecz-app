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

export const editUser = (user: any) => {
  if (__DEV__) {
    console.log(user, apiUrl);
  }
  return axios.put(
    apiUrl + 'user/' + user?.id,
    {...user},
    {
      headers: {
        'x-access-token': apiToken,
      },
    },
  );
};

export const changePassword = (user: any) => {
  if (__DEV__) {
    console.log(user, apiUrl);
  }

  return axios.post(
    apiUrl + 'user/change-password',
    {...user},
    {
      headers: {
        'x-access-token': apiToken,
      },
    },
  );
};

export const updateAvatar = (id: string, avatar: any) => {
  const url = `${apiUrl}user/${id}/update-avatar`;

  if (__DEV__) {
    console.log(avatar, id, url, apiUrl);
  }
  return axios.post(url, avatar, {
    headers: {
      'x-access-token': apiToken,
      'Content-Type': 'multipart/form-data',
    },
  });
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

export const me = (id: any) => {
  if (__DEV__) {
    console.log(id, apiUrl);
  }

  return axios.get(apiUrl + 'user/' + id, {
    headers: {
      'x-access-token': apiToken,
    },
  });
};
