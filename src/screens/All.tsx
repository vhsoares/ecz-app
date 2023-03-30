import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home';
import StoreProduct from './StoreProduct';
import ProductScreen from './Product';
import {View} from 'react-native';
import {Layout} from '../components/layout/layout';

const AllScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Store" component={StoreProduct} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default AllScreens;
