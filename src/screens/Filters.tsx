import axios from 'axios';
import {useState, useEffect} from 'react';
import SearchModal from '../components/search/searchModal';
import Layout from '../components/layout/layout';

const Filters = () => {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const result = await axios.get('https://economizei.com/api/site/home');

      setStores(result.data.stores);
      setCategories(result.data.categories);
    };

    fetchStores();
  }, []);
  return (
    <Layout>
      <SearchModal stores={stores} />
    </Layout>
  );
};

export default Filters;
