import axios from 'axios';
import {apiUrl} from '../utils/api';
import {getToken} from '../utils/AuthToken';

const request = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
});

export const getProducts = () => {
  return request.get('site/home');
};

export const getNotifications = async () => {
  const token = await getToken();

  return request.get('notification', {
    headers: {
      'x-access-token': token,
    },
  });
};

export const getPromoRelampago = () => {
  return request.get('site/promos-relampago');
};

export const getStories = () => {
  return request.get('site/stories');
};

export const getProduct = (id: string) => {
  return request.get('site/product/' + id);
};

export const getStore = (id: string) => {
  return request.get('site/store/' + id);
};

export const getCategory = (id: string) => {
  return request.get('site/category/' + id);
};

export const getSearch = (search: string) => {
  return request.get('site/search?search=' + search);
};

export const getFiltered = (
  order: string,
  priceMin: string,
  priceMax: string,
  storeId: string,
) => {
  return axios.get('site/products', {
    params: {
      order,
      storeId,
      priceMin,
      priceMax,
    },
  });
};
