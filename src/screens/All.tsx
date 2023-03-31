import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home';
import StoreProduct from './StoreProduct';
import ProductScreen from './Product';

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
      <Stack.Screen name="StoreProduct" component={StoreProduct} />
    </Stack.Navigator>
  );
};

export default AllScreens;
