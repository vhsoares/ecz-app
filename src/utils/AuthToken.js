import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  } catch (err) {
    console.log(err);
    return null;
  }
};
