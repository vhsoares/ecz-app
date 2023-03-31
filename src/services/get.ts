import axios from 'axios';

export const getProducts = () => {
  return axios.get('https://economizei.com/api/site/home');
};

export const getProduct = (id: string) => {
  return axios.get('https://economizei.com/api/site/product/' + id);
};

export const getStore = (id: string) => {
  return axios.get('https://economizei.com/api/site/store/' + id);
};

export const getCategory = (id: string) => {
  return axios.get('https://economizei.com/api/site/category/' + id);
};

export const getSearch = (search: string) => {
  return axios.get('https://economizei.com/api/site/search?search=' + search);
}
