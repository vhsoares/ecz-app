import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from './Home';
import StoreProduct from './StoreProduct';
import ProductScreen from './Product';
import Filters from './Filters';
import Category from './Category';
import Search from './Search';
import Categories from './Categories';
import ProductFiltered from './ProductFiltered';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import SplashScreen from './Splash';
import NotificationsScreen from './Notifications';
import PromoRelampago from './PromoRelampago';
import ProfileScreen from './Profile';
import {getToken} from '../utils/AuthToken';
import EditProfileScreen from './EditProfile';
import ForgotPasswordScreen from './ForgotPassword';
import NewPasswordScreen from './NewPassword';

const AllScreens = () => {
  const Stack = createNativeStackNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if the user is authenticated
      const token = await getToken();
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuthentication();

    // Subscribe to navigation events
    const unsubscribe = navigation.addListener('state', checkAuthentication);

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  if (isLoading) {
    // You can show a loading screen while checking authentication
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      {/* Auth */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

      {/* Protected Screens */}
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Filters" component={Filters} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="ProductsFiltered" component={ProductFiltered} />
          <Stack.Screen name="PromoRelampago" component={PromoRelampago} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Store" component={StoreProduct} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="StoreProduct" component={StoreProduct} />
        </>
      ) : null}
    </Stack.Navigator>
  );
};

export default AllScreens;
