/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {navigationRef} from './src/utils/RootNavigation';
import {ThemeProvider} from '@rneui/themed';
import Menu from './src/components/menu/menu';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AllScreens from './src/screens/All';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreens from './src/screens/Auth';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    marginBottom: 100,
  };

  const isAuth = false;

  return (
    <ThemeProvider>
      {isAuth ? (
        <>
          <SafeAreaView style={styles}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={styles.backgroundColor}
            />
            <NavigationContainer ref={navigationRef}>
              <AllScreens />
            </NavigationContainer>
          </SafeAreaView>
          <Menu />
        </>
      ) : (
        <NavigationContainer ref={navigationRef}>
          <AuthScreens />
        </NavigationContainer>
      )}
    </ThemeProvider>
  );
}

export default App;
