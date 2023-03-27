import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {getProduct, getStore} from '../services/get';
import {Button, Text} from '@rneui/base';
import MenuButton from '../components/menu/menuButton';
import StoryHeader from '../components/story/storyHeader';
import StoryProduct from '../components/story/storyProduct';
import {GestureDetector} from 'react-native-gesture-handler';
import { TapGestureHandler, State } from 'react-native-gesture-handler';


const StoreProduct = () => {
  const [store, setStore]: any = useState();
  const [products, setProducts]: any = useState([{}]);
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const getLoja = async () => {
      const result = await getStore('944b084e-2c82-4d06-9278-2f315d178127');
      setStore(result.data.store);
      setProducts(result.data.products);
    };

    getLoja();
  }, []);

  const counter = 10000;

  const updateProduct = () => {};

  return (
    <View>
      <View style={{paddingTop: 20, backgroundColor: '#fff'}}>
        <StoryHeader
          storeImage={store?.image}
          storeName={store?.name}
          productAmount={products?.length}
          activeProduct={activeProduct}
          onClose={() => {}}
        />


          <StoryProduct
            image={products[activeProduct]?.image}
            name={products[activeProduct]?.name}
            priceFrom={products[activeProduct]?.previousPrice}
            price={products[activeProduct]?.price}
            shareLink={products[activeProduct]?.link}
          />
      </View>
      <Text></Text>
    </View>
  );
};

export default StoreProduct;
