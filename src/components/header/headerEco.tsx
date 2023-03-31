import {Image, Text} from 'react-native';
import {Header} from '@rneui/themed';

const HeaderEco = () => {
  return (
    <>
      <Header
        backgroundColor="#F6F3F6"
        leftComponent={<Text>voltar</Text>}
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
