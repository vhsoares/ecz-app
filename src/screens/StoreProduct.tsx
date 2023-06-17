import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/base';
import StoryHeader from '../components/story/storyHeader';
import StoryProduct from '../components/story/storyProduct';
import {useNavigation} from '@react-navigation/native';

const StoreProduct = ({route}: any) => {
  const [availableStores, setAvailableStores] = useState(
    route.params.availableStores,
  );
  const [currentIndex, setCurrentIndex] = useState(route.params.currentIndex);
  const [store, setStore]: any = useState(route.params.store);
  const [products, setProducts]: any = useState(route.params.store.products);
  const navigation = useNavigation<any>();
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveProductIndex(prevIndex => prevIndex + 1);
    }, 4000);

    if (closed) {
      console.log('clsong////');
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [products.length, activeProductIndex, closed]);

  useEffect(() => {
    console.log(activeProductIndex, products.length);
    if (activeProductIndex >= products.length || activeProductIndex < 0) {
      console.log('navigation again');
      if (availableStores[currentIndex + 1]) {
        setStore(availableStores[currentIndex + 1]);
        setProducts(availableStores[currentIndex + 1].products);
        setCurrentIndex(currentIndex + 1);
        setActiveProductIndex(0);
      } else {
        setClosed(true);
        navigation.goBack();
      }
    }
    return () => {
      console.log('unmount');
    };
  }, [activeProductIndex, navigation, products, availableStores, currentIndex]);

  const handleClose = () => {
    navigation.reset({index: 0, routes: [{name: 'Home'}]});
    setClosed(true);
  };

  const handleClick: any = (value: any) => {
    setActiveProductIndex(prevState =>
      value === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  return (
    <View>
      <View style={{paddingTop: 20, backgroundColor: '#fff'}}>
        <StoryHeader
          storeImage={store?.image || products[activeProductIndex]?.image}
          storeName={store?.name}
          productAmount={products?.length}
          activeProduct={activeProductIndex}
          onClose={handleClose}
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
