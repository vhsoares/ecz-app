import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/base';
import {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getStore} from '../../services/get';

type Stories = {
  stores: Array<any>;
};

const Stories = ({stores}: Stories) => {
  const navigation = useNavigation<any>();
  const [availableStores, setAvailableStores] = useState([] as Array<any>);

  useEffect(() => {
    const getAvailableStores = async () => {
      let filteredStores: Array<any> = [];

      for (const store of stores) {
        const response = await getStore(store.id);

        if (response?.data?.products?.length) {
          filteredStores.push({
            ...store,
            products: response.data.products,
          });
        }
      }

      setAvailableStores(filteredStores);
    };

    getAvailableStores();
  }, [stores]);

  return (
    <View
      style={{
        ...styles.container,
        opacity: availableStores.length === 0 ? 0 : 1,
      }}>
      <ScrollView horizontal>
        {availableStores.map((store, index) => (
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => navigation.navigate('StoreProduct', {store})}
            key={index}>
            <LinearGradient
              colors={['#CA4EE2', '#7135B1']}
              style={styles.imageContainer}>
              <View
                style={{
                  ...styles.imageContainer,
                  width: 61,
                  height: 61,
                  flex: 0,
                }}>
                <Image
                  source={{uri: 'https://economizei.com/api/' + store.image}}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
            </LinearGradient>
            <Text style={styles.text}>{store.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 24,
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 50,
    flex: 1,
    marginRight: 0,
  },
  text: {
    fontSize: 8,
    color: '#A69CA9',
    lineHeight: 16,
  },
});

export default Stories;
