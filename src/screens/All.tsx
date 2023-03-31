import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home';
import StoreProduct from './StoreProduct';
import ProductScreen from './Product';
import Filters from './Filters';
import Category from './Category';
import Search from './Search';
import Categories from './Categories';
import ProductFiltered from './ProductFiltered';

const AllScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="ProductsFiltered" component={ProductFiltered} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Store" component={StoreProduct} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="StoreProduct" component={StoreProduct} />
    </Stack.Navigator>
  );
};

export default AllScreens;
