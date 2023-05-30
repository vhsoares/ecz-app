import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Login';
import RegisterScreen from './Register';

const AuthScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthScreens;
