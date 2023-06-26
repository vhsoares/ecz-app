import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MenuButton from './menuButton';
import {Linking} from 'react-native';
import * as RootNavigation from './../../utils/RootNavigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getUser} from '../../utils/AuthToken';
import {apiUrl} from '../../utils/api';

const Menu = (props: any) => {
  const [user, setUser] = useState() as any;
  const relampagoActive = require('../../assets/images/relampago-active.png');
  const relampagoInactive = require('../../assets/images/Lightning.png');
  const homeActive = require('../../assets/images/House.png');
  const homeInactive = require('../../assets/images/home-inactive.png');
  const navigation = useNavigation();

  const gradientProps = {
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 1.5},
  };
  const inactive = {...gradientProps, colors: ['#E2E2E2', '#FFFFFF']};
  const active = {...gradientProps, colors: ['#CA4EE2', '#7135B1']};
  const route = useRoute();

  const handleButtonPress = (route: any) => {
    RootNavigation.navigate(route);
  };

  const handleGetUser = async () => {
    const response = await getUser();

    console.log(response);
    setUser(response);
  };

  useEffect(() => {
    if (!user) {
      handleGetUser();
    }
  }, [navigation, user]);

  return (
    <View
      style={{
        elevation: 0,
        padding: 0,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -20},
        shadowOpacity: 0.15,
        shadowRadius: 20,
        width: '100%',
        height: props?.menuHeight,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#F6F3F7',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: 'auto',
          flex: 1,
          marginBottom: 0,
          shadowColor: 'red',
          elevation: 10,
        }}>
        <MenuButton
          title={'Home'}
          onPress={() => handleButtonPress('Home')}
          linearGradient={route.name === 'Home' ? active : inactive}
          image={route.name === 'Home' ? homeActive : homeInactive}
        />

        <MenuButton
          title={'comprar'}
          onPress={() => handleButtonPress('Categories')}
          linearGradient={route.name === 'Categories' ? active : inactive}
          active={route.name === 'Categories'}
          image={require('../../assets/images/Purse.png')}
          icon="purse"
        />

        {/* <MenuButton
          title={'adicionar'}
          onPress={() => Linking.openURL('https://economizei.com/')}
          linearGradient={route.name === 'Adicionar' ? active : inactive}
          image={require('../../assets/images/Add.png')}
        /> */}

        <MenuButton
          title={'relampago'}
          onPress={() => handleButtonPress('PromoRelampago')}
          linearGradient={route.name === 'PromoRelampago' ? active : inactive}
          active={route.name === 'PromoRelampago'}
          icon="flash"
          image={
            route.name === 'PromoRelampago'
              ? relampagoActive
              : relampagoInactive
          }
          imageWidth={15}
        />

        <MenuButton
          title={'profile'}
          onPress={() => handleButtonPress('Profile')}
          linearGradient={route.name === 'Profile' ? active : inactive}
          active={route.name === 'Profile'}
          icon={!user?.picture && 'account'}
          imageWidth={30}
          imageHeight={30}
          imageRadius={50}
          image={
            user?.picture
              ? {
                  uri: `${user?.picture?.includes('http') ? '' : apiUrl}${
                    user?.picture
                  }`,
                }
              : null
          }
        />
      </View>
    </View>
  );
};

export default Menu;
