

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home';
import { NavigationContainer } from '@react-navigation/native';

const AllScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
  );
};

export default AllScreens;
