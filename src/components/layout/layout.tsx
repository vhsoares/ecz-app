import {ScrollView, View} from 'react-native';
import HeaderEco from '../header/headerEco';
import SearchBar from '../search/search';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Layout = (props: any) => {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchStores = async () => {
      const result = await axios.get('https://economizei.com/api/site/home');

      setStores(result.data.stores);
      setCategories(result.data.categories)
    };

    fetchStores();
  }, []);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <HeaderEco />
      <SearchBar stores={stores} />
      <View style={{flexGrow: 1, paddingBottom: 50}}>{props.children}</View>
    </ScrollView>
  );
};

export default Layout;
