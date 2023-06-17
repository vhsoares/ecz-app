import axios, {AxiosError, AxiosResponse} from 'axios';
import {apiUrl} from '../utils/api';
import {getToken} from '../utils/AuthToken';

const request = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
});

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      console.log('logged off');
    }
    throw error;
  },
);

export const doComment = async (comment: string, productId: string) => {
  const token = await getToken();

  if (__DEV__) {
    console.log(comment, token, apiUrl);
  }

  return request.post(
    'site-actions/comment',
    {
      content: comment,
      title: comment,
      productId: productId,
    },
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
};
