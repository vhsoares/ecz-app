import {useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {getProducts} from '../services/get';
import SearchBar from '../components/search/search';
import Layout from '../components/layout/layout';

import * as RootNavigation from './../utils/RootNavigation';

export const Categories = () => {
  const [categories, setCategories] = useState([] as Array<any>);

  useEffect(() => {
    const getAll = async () => {
      const result = await getProducts();
      setCategories(result.data.categories);
    };
    getAll();
  }, []);

  return (
    <Layout>
      <View style={{marginHorizontal: 15}}>
        <SearchBar />
        <Text
          style={{
            fontSize: 22,
            color: '#8612A7',
            fontWeight: '600',
            marginBottom: 15,
            marginLeft: 5,
          }}>
          Categorias
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {categories.map(category => {
            return (
              <TouchableOpacity
                style={{
                  width: '48%',
                  height: 100,
                  margin: '1%',
                  position: 'relative',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
                onPress={() =>
                  RootNavigation.navigate('Category', {id: category.id})
                }>
                <Image
                  source={{uri: 'https://economizei.com/api/' + category.image}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'cover'}
                />
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    backgroundColor: '#381B7D7a',
                    position: 'absolute',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FDFCFD',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Layout>
  );
};

export default Categories;
