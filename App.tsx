/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {ThemeProvider} from '@rneui/themed';

import Menu from './src/components/menu/menu';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import HeaderEco from './src/components/header/headerEco';
import AllScreens from './src/screens/All';
import {NavigationContainer} from '@react-navigation/native';
import StoreProduct from './src/screens/StoreProduct';

import HomeScreen from './src/screens/Home';
import ProductScreen from './src/screens/Product';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <HeaderEco />
          <NavigationContainer>
            <AllScreens />
          </NavigationContainer>
          {/* <StoreProduct /> */}
          {/* <HomeScreen /> */}
          {/* <ProductScreen /> */}
        </ScrollView>
      </SafeAreaView>
        <Menu />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
