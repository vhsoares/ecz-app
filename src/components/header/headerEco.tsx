import {Image, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as RootNavigation from './../../utils/RootNavigation';
import {MaterialIcon} from '../icon/icon';
import {useEffect, useState} from 'react';

const BackButton = () => {
  const [canGoBack, setCanGoBack] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentRouteName = route.name;

  const handleBack = () => {
    RootNavigation.back();
  };

  useEffect(() => {
    const previousRouteName =
      navigation?.getState()?.routes?.[
        navigation?.getState()?.routes.length - 2
      ]?.name;

    setCanGoBack(
      previousRouteName !== 'Login' &&
        previousRouteName !== 'Splash' &&
        RootNavigation.canGoBack(),
    );
  }, [navigation, currentRouteName]);

  return (
    <View style={{position: 'relative', left: -12}}>
      {canGoBack && (
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../../assets/images/BackGood.png')}
            style={{height: 20}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const HeaderEco = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
        backgroundColor: '#F6F3F6',
        marginBottom: 12,
        width: '100%',
      }}>
      <View
        style={{
          width: 25,
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <BackButton />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={{width: 95, height: 15, marginBottom: 0}}
        />
      </View>
      <View
        style={{
          width: 25,
        }}>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Notifications')}>
          <MaterialIcon name="bell-outline" size="large" color="#8612A7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderEco;
