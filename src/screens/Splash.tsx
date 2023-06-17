// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {getToken} from '../utils/AuthToken';

const SplashScreen = ({navigation, route}: any) => {
  useEffect(() => {
    console.log(navigation, 'navigation');
    if (navigation && navigation.replace) {
      setTimeout(
        () => {
          getToken()
            .then(value => {
              console.log(value);
              navigation.navigate(value === null ? 'Login' : 'Home');
            })
            .catch(e => {
              console.log(e, 'Erro ao navegar');
              navigation.navigate('Login');
            });
        },
        route?.params?.loggingIn ? 1000 : 5000,
      );
    }
  }, [navigation, route?.params?.loggingIn]);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
        }}
        colors={['#8612A7', '#2F1C78']}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            marginBottom: 0,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              marginBottom: 0,
            }}>
            <Image
              source={require('../assets/images/logo-icon.png')}
              style={{width: 96, height: 96, marginTop: 100, marginBottom: 58}}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3c5064',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
