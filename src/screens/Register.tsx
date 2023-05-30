import {Image, Text} from '@rneui/base';
import {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {MaterialIcon} from '../components/icon/icon';

const fontFamily = Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F3F6',
    flexGrow: 2,
    borderRadius: 40,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 40,
    gap: 16,
  },
  inputContainer: {
    backgroundColor: '#F6F3F7',
    shadowColor: '#45254E',
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 8,
    width: '100%',
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily,
    fontWeight: '400',
    color: '#A69CA9',
    backgroundColor: '#F6F3F6',
    borderRadius: 8,
  },
  row: {
    width: '100%',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#23052C',
    fontFamily,
    opacity: 1,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  iconContainer: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#8612A7',
    borderRadius: 6,
    padding: 2,
    backgroundColor: 'transparent',
  },
});

const RegisterScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View>
      <View
        style={{
          paddingTop: 65,
          paddingHorizontal: 24,
          paddingBottom: 24,
          backgroundColor: '#FFF',
          borderRadius: 40,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 50,
            alignItems: 'center',
            gap: 16,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <MaterialIcon
              name="chevron-left"
              size="extraLarge"
              color="#4E4750"
            />
          </TouchableOpacity>
          <Text style={{fontFamily, fontWeight: '600', fontSize: 13}}>
            Cadastro
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 20,
          }}>
          <View
            style={{
              gap: 10,
              flexGrow: 1,
              flexBasis: '40%',
            }}>
            <Text style={{fontFamily, fontWeight: '600', fontSize: 20}}>
              Cadastro
            </Text>
            <Text
              style={{
                fontFamily,
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 22,
              }}>
              Preencha os campos abaixo para criar a sua conta
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flexBasis: '50%',
            }}>
            <Image
              source={require('../assets/images/login.png')}
              style={{width: 130, height: 130}}
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#A69CA9"
              placeholder="Nome completo"
              value={username}
              onChangeText={setUsername}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#A69CA9"
              placeholder="Digite sua senha"
              textContentType="password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('go2');
          }}
          style={{
            backgroundColor: username && password ? '#8612A7' : '#F4E8F8',
            width: '100%',
            paddingVertical: 12,
            borderRadius: 8,
            height: 56,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={!(username && password)}>
          <Text
            style={{
              textAlign: 'center',
              color: username && password ? '#FFF' : '#A69CA9',
              fontFamily,
              fontWeight: 'bold',
            }}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
