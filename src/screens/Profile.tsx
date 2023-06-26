import {useState, useEffect} from 'react';
import Layout from '../components/layout/layout';
import {Image, Text} from '@rneui/base';
import {TouchableOpacity, View} from 'react-native';
import {MaterialIcon} from '../components/icon/icon';
import {fontFamily} from '../styles/font';
import {getUser} from '../utils/AuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {button} from '../styles/button';
import {apiUrl} from '../utils/api';

const ProfileScreen = ({navigation}: any) => {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    const handleGetUser = async () => {
      const currentUser = await getUser();

      if (currentUser) {
        setUser(currentUser);
      }
    };

    handleGetUser();
  }, []);

  const handleLogout = async () => {
    // Implement the logout functionality here
    // Clear any user data or tokens from AsyncStorage or state
    // Redirect to the Login screen

    console.log('login out');

    await Promise.all([
      AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('user'),
    ]);

    navigation.replace('Splash');
  };

  const handleEditProfile = () => {
    navigation.replace('EditProfile');
  };

  return (
    <Layout>
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          maxWidth: '100%',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'flex-end',
            marginBottom: 20,
            position: 'relative',
          }}>
          <View>
            {user.picture ? (
              <Image
                source={{
                  uri: user.picture?.includes('http')
                    ? user.picture
                    : `${apiUrl}${user.picture}`,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            ) : (
              <MaterialIcon name="account-circle" size={100} color="#CCC" />
            )}
          </View>
          <View>
            <Text
              style={{
                fontWeight: '400',
                color: '#4E4750',
                fontSize: 17,
                marginBottom: 2,
              }}>
              Olá,
            </Text>
            <Text
              style={{
                color: '#4E4750',
                fontWeight: '800',
                fontSize: 22,
              }}>
              {user?.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleEditProfile}
            style={{
              backgroundColor: '#8612A7',
              borderRadius: 50,
              padding: 5,
              alignSelf: 'flex-start',
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
            <MaterialIcon name="pencil-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flexGrow: 1,
            gap: 20,
          }}>
          <TouchableOpacity
            onPress={handleLogout} // Call the handleLogout function on button press
            style={{
              alignContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              maxWidth: '100%',
              ...button.container,
            }}>
            <MaterialIcon
              name="account-remove-outline"
              color="#8612A7"
              size="large"
            />
            <Text
              style={{
                fontFamily: fontFamily,
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                color: '#A69CA9',
                fontSize: 15,
              }}>
              Excluir minha conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout} // Call the handleLogout function on button press
            style={{
              alignContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              maxWidth: '100%',
              ...button.container,
            }}>
            <MaterialIcon name="logout" color="#8612A7" size="large" />
            <Text
              style={{
                fontFamily: fontFamily,
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                color: '#A69CA9',
                fontSize: 15,
              }}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default ProfileScreen;
