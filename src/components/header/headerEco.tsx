import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Header} from '@rneui/themed';
import * as RootNavigation from './../../utils/RootNavigation';

const BackButton = () => {
  return (
    <View>
      {RootNavigation.canGoBack() && (
        <TouchableOpacity onPress={() => RootNavigation.back()}>
          <Image
            source={require('../../assets/images/BackGood.png')}
            style={{height: 25}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const HeaderEco = () => {
  return (
    <>
      <Header
        backgroundColor="#F6F3F6"
        leftComponent={<BackButton />}
        centerComponent={
          <Image
            source={require('../../assets/images/Logo.png')}
            style={{width: 95, height: 15, marginBottom: 12}}
          />
        }
      />
    </>
  );
};

export default HeaderEco;
