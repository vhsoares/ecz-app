import {Image, Text} from '@rneui/base';
import {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {MaterialIcon} from '../components/icon/icon';
import {Formik} from 'formik';
import * as yup from 'yup';
import {createUser} from '../services/auth';

const fontFamily = Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F3F6',
    flexGrow: 2,
    borderRadius: 40,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 40,
    gap: 14,
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
  inputContainerInline: {
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
    flexGrow: 1,
    maxHeight: 56,
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
  inputError: {
    position: 'absolute',
    bottom: -18,
  },
  inputErrorText: {
    fontSize: 12,
    color: '#F0614D',
    fontWeight: '500',
  },
  row: {
    width: '100%',
    gap: 14,
  },
  rowInline: {
    width: '100%',
    gap: 14,
    flexDirection: 'row',
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
  requirementsText: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    color: '#A69CA9',
    fontFamily,
    fontSize: 15,
    fontWeight: '500',
  },
  iconVisibility: {
    position: 'absolute',
    right: 12,
    top: 18,
  },
});

const RegisterScreen = ({navigation}: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const handleSubmitForm = async (values: any) => {
    console.log(values, 'values');

    try {
      const response = await createUser(values);

      console.log(response, 'response');
    } catch (err) {
      console.log(err, 'err');
    }
  };

  return (
    <ScrollView>
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
            marginBottom: 30,
            alignItems: 'center',
            gap: 16,
            marginLeft: -10,
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
      <Formik
        validateOnMount={true}
        validateOnBlur={true}
        initialValues={{
          name: '',
          email: '',
          password: '',
          repeatPassword: '',
          ddd: '',
          phone: '',
        }}
        onSubmit={values => handleSubmitForm(values)}
        validationSchema={yup.object().shape({
          name: yup.string().required('Insira seu nome'),
          email: yup
            .string()
            .email('Insira um email válido')
            .required('Insira seu email'),
          ddd: yup
            .string()
            .min(2, 'DDD Inválido')
            .max(2, 'DDD Inválido')
            .required('Insira seu DDD'),
          phone: yup
            .string()
            .min(7, 'Celular Inválido')
            .max(12, 'Celular Inválido')
            .required('Insira seu Celular'),
          password: yup
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .max(20, 'A senha deve ter no máximo 20 caracteres')
            .matches(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[#*&@]).*$/,
              'A senha deve conter os requisitos abaixo',
            )
            .required('Insira uma senha'),
          repeatPassword: yup
            .string()
            .oneOf([yup.ref('password'), ''], 'As senhas são diferentes')
            .required('Repita sua senha'),
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
                  marginBottom: touched.name && errors.name ? 12 : 0,
                }}>
                <TextInput
                  value={values.name}
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  placeholder="Nome completo"
                />
                <View style={styles.inputError}>
                  {touched.name && errors.name && (
                    <Text style={styles.inputErrorText}>{errors.name}</Text>
                  )}
                </View>
              </View>
            </View>
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
            <View style={styles.rowInline}>
              <View
                style={{
                  ...styles.inputContainerInline,
                  flexGrow: 0,
                  width: 99,
                  marginBottom: touched.ddd && errors.ddd ? 12 : 0,
                }}>
                <TextInput
                  value={values.ddd}
                  style={styles.input}
                  onChangeText={handleChange('ddd')}
                  onBlur={() => setFieldTouched('ddd')}
                  placeholder="DDD"
                  autoCapitalize="none"
                  keyboardType="numeric"
                />
                <View style={styles.inputError}>
                  {touched.ddd && errors.ddd && (
                    <Text style={styles.inputErrorText}>{errors.ddd}</Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  ...styles.inputContainerInline,
                  marginBottom: touched.phone && errors.phone ? 12 : 0,
                }}>
                <TextInput
                  value={values.phone}
                  style={styles.input}
                  onChangeText={handleChange('phone')}
                  onBlur={() => setFieldTouched('phone')}
                  placeholder="Celular"
                  autoCapitalize="none"
                  keyboardType="numeric"
                />
                <View style={styles.inputError}>
                  {touched.phone && errors.phone && (
                    <Text style={styles.inputErrorText}>{errors.phone}</Text>
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
                    name={!passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                    size="large"
                    color="#8612A7"
                  />
                </TouchableOpacity>
                <View style={styles.inputError}>
                  {touched.password && errors.password && (
                    <Text style={styles.inputErrorText}>{errors.password}</Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View
                style={{
                  ...styles.inputContainer,
                  marginBottom:
                    touched.repeatPassword && errors.repeatPassword ? 12 : 0,
                }}>
                <TextInput
                  value={values.repeatPassword}
                  style={{
                    ...styles.input,
                    paddingRight: 50,
                  }}
                  onChangeText={handleChange('repeatPassword')}
                  placeholder="Senha"
                  onBlur={() => setFieldTouched('repeatPassword')}
                  secureTextEntry={!repeatPasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.iconVisibility}
                  onPress={toggleRepeatPasswordVisibility}>
                  <MaterialIcon
                    name={
                      !repeatPasswordVisible ? 'eye-outline' : 'eye-off-outline'
                    }
                    size="large"
                    color="#8612A7"
                  />
                </TouchableOpacity>
                <View style={styles.inputError}>
                  {touched.repeatPassword && errors.repeatPassword && (
                    <Text style={styles.inputErrorText}>
                      {errors.repeatPassword}
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily,
                    color: '#A69CA9',
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                  Sua senha deve conter 8 caracteres
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 12,
                  }}>
                  <MaterialIcon
                    name="information-outline"
                    size="large"
                    color="#A69CA9"
                  />
                  <Text style={styles.requirementsText}>1 letra maiuscula</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 12,
                  }}>
                  <MaterialIcon
                    name="information-outline"
                    size="large"
                    color="#A69CA9"
                  />
                  <Text style={styles.requirementsText}>1 algarismo</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 12,
                  }}>
                  <MaterialIcon
                    name="information-outline"
                    size="large"
                    color="#A69CA9"
                  />
                  <Text style={styles.requirementsText}>
                    1 caractere especial: #,*,&,@
                  </Text>
                </View>
              </View>
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
                marginTop: 20,
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
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegisterScreen;
