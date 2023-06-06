import {Image, Text} from '@rneui/base';
import {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {MaterialIcon} from '../components/icon/icon';

import {Formik} from 'formik';
import * as yup from 'yup';
import {signIn} from '../services/auth';

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
    color: '#23052C',
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
  inputError: {
    position: 'absolute',
    bottom: -18,
  },
  inputErrorText: {
    fontSize: 12,
    color: '#F0614D',
    fontWeight: '500',
  },
  iconVisibility: {
    position: 'absolute',
    right: 12,
    top: 18,
  },
});

const LoginScreen = ({navigation}: any) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmitForm = async (values: any) => {
    console.log('LOGIN');
    console.log(values, 'LOGIN');

    try {
      const user = await signIn(values);

      if (user?.data?.id) {
        console.log(user?.data?.id, 'SUCCESS');
      }
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <ScrollView>
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
          style={{width: 96, height: 96, marginTop: 80, marginBottom: 58}}
        />
        <Formik
          validateOnMount={true}
          validateOnBlur={true}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => handleSubmitForm(values)}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('Insira um email válido')
              .required('Insira seu email'),
            password: yup
              .string()
              .min(8, 'Senha inválida')
              .required('Insira uma senha'),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={styles.container}>
              <View style={styles.row}>
                <View
                  style={{
                    ...styles.inputContainer,
                    marginBottom: touched.email && errors.email ? 12 : 0,
                  }}>
                  <TextInput
                    value={values.email}
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <View style={styles.inputError}>
                    {touched.email && errors.email && (
                      <Text style={styles.inputErrorText}>{errors.email}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View
                  style={{
                    ...styles.inputContainer,
                    marginBottom: touched.password && errors.password ? 12 : 0,
                  }}>
                  <TextInput
                    value={values.password}
                    style={{
                      ...styles.input,
                      paddingRight: 50,
                    }}
                    onChangeText={handleChange('password')}
                    placeholder="Senha"
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={!passwordVisible}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.iconVisibility}
                    onPress={togglePasswordVisibility}>
                    <MaterialIcon
                      name={
                        !passwordVisible ? 'eye-outline' : 'eye-off-outline'
                      }
                      size="large"
                      color="#8612A7"
                    />
                  </TouchableOpacity>
                  <View style={styles.inputError}>
                    {touched.password && errors.password && (
                      <Text style={styles.inputErrorText}>
                        {errors.password}
                      </Text>
                    )}
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
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: isValid ? '#8612A7' : '#F4E8F8',
                    width: '100%',
                    paddingVertical: 12,
                    borderRadius: 8,
                    height: 56,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  disabled={!isValid}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: isValid ? '#FFF' : '#A69CA9',
                      fontFamily,
                      fontWeight: 'bold',
                    }}>
                    Criar conta
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
                  <View
                    style={{flexDirection: 'row', gap: 20, marginBottom: 24}}>
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
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
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
            </View>
          )}
        </Formik>
      </LinearGradient>
    </ScrollView>
  );
};

export default LoginScreen;
