import {View} from 'react-native';
import MenuButton from './menuButton';
import {Linking} from 'react-native';
import * as RootNavigation from './../../utils/RootNavigation';

// todo tonight
// product Profile
// product Card
// sidebar Navigation
// share Button

const Menu = () => {
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
        position: 'absolute',
        bottom: -5,
        width: '100%',
        paddingTop: 10,
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
          padding: 10,
          paddingBottom: 30,
          elevation: 10,
          // position: 'absolute',
          // bottom: 0
        }}>
        <MenuButton
          title={'Home'}
          onPress={() => RootNavigation.navigate('Home')}
          linearGradient={{
            colors: ['#CA4EE2', '#7135B1'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 1.5},
          }}
          image={require('../../assets/images/House.png')}
        />
        <MenuButton
          title={'comprar'}
          onPress={() => RootNavigation.navigate('Categories')}
          linearGradient={{
            colors: ['#E2E2E2', '#FFFFFF'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 1.5},
          }}
          image={require('../../assets/images/Purse.png')}
        />

        <MenuButton
          title={'adicionar'}
          onPress={() => Linking.openURL('https://economizei.com/')}
          linearGradient={{
            colors: ['#E2E2E2', '#FFFFFF'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 1.5},
          }}
          image={require('../../assets/images/Add.png')}
        />

        <MenuButton
          title={'relampago'}
          onPress={() => Linking.openURL('https://economizei.com/promos-relampago')}
          linearGradient={{
            colors: ['#E2E2E2', '#FFFFFF'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 1.5},
          }}
          image={require('../../assets/images/Lightning.png')}
          imageWidth={15}
        />
      </View>
    </View>
  );
};

export default Menu;
