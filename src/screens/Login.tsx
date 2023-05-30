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

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <LinearGradient
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      colors={['#8612A7', '#2F1C78']}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 1}}>
      <Image
        source={require('../assets/images/logo-icon.png')}
        style={{width: 96, height: 96, marginTop: 80, marginBottom: 68}}
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Usuário</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#A69CA9"
              placeholder="Insira seu celular com ddd"
              value={username}
              onChangeText={setUsername}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Senha</Text>
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
        <TouchableOpacity onPress={() => console.log('go')}>
          <Text
            style={{
              color: '#8612A7',
              textDecorationLine: 'underline',
              fontFamily,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left',
              alignItems: 'flex-start',
            }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={[styles.checkbox]}
            onPress={handleRememberMeToggle}>
            <View
              style={[
                styles.iconContainer,
                rememberMe && {backgroundColor: '#8612A7'},
              ]}>
              <MaterialIcon
                name="check"
                size={'medium'}
                color={rememberMe ? '#FFF' : 'transparent'}
              />
            </View>
            <Text style={styles.label}>Lembrar de mim</Text>
          </TouchableOpacity>
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
            Entrar
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 'auto',
            flexGrow: 2,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 20,
            marginBottom: 54,
          }}>
          <View style={{flexDirection: 'row', gap: 20, marginBottom: 24}}>
            <TouchableOpacity
              onPress={() => console.log('login google')}
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: 56,
                flexDirection: 'row',
                gap: 10,
                flexGrow: 1,
                shadowColor: '#45254E',
                shadowOffset: {
                  width: -4,
                  height: -4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                borderRadius: 8,
                backgroundColor: '#F6F3F7',
              }}>
              <Text style={{fontFamily}}>Entrar com</Text>
              <Image
                source={require('../assets/images/google.png')}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('login instagram')}
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: 56,
                flexDirection: 'row',
                gap: 10,
                flexGrow: 1,
                shadowColor: '#45254E',
                shadowOffset: {
                  width: -4,
                  height: -4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                borderRadius: 8,
                backgroundColor: '#F6F3F7',
              }}>
              <Text style={{fontFamily}}>Entrar com</Text>
              <Image
                source={require('../assets/images/instagram.png')}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: '#8612A7',
                fontFamily,
                textAlign: 'center',
                alignItems: 'flex-start',
                fontWeight: 'bold',
              }}>
              Não possui uma conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
