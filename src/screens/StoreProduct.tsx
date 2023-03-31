import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/base';
import StoryHeader from '../components/story/storyHeader';
import StoryProduct from '../components/story/storyProduct';
import {useNavigation} from '@react-navigation/native';

const StoreProduct = ({route}: any) => {
  const [store, setStore]: any = useState();
  const [products, setProducts]: any = useState([{}]);
  const navigation = useNavigation<any>();
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveProductIndex(prevIndex => prevIndex + 1);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [products.length, activeProductIndex]);

  useEffect(() => {
    setStore(route.params.store);
    setProducts(route.params.store.products);
  }, [route?.params?.store]);

  useEffect(() => {
    if (activeProductIndex >= products.length || activeProductIndex < 0) {
      navigation.navigate('Home');
    }
  }, [activeProductIndex, navigation, products]);

  const handleClick: any = (value: any) => {
    setActiveProductIndex(prevState =>
      value === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  return (
    <View>
      <View style={{paddingTop: 20, backgroundColor: '#fff'}}>
        <StoryHeader
          storeImage={store?.image}
          storeName={store?.name}
          productAmount={products?.length}
          activeProduct={activeProductIndex}
          onClose={() => navigation.navigate('Home')}
        />
        <StoryProduct
          image={products[activeProductIndex]?.image}
          name={products[activeProductIndex]?.name}
          priceFrom={products[activeProductIndex]?.previousPrice}
          price={products[activeProductIndex]?.price}
          shareLink={products[activeProductIndex]?.link}
          handleClick={handleClick}
        />
      </View>
      <Text />
    </View>
  );
};

export default StoreProduct;
