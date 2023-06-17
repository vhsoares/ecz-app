import {useState, useEffect} from 'react';
import Layout from '../components/layout/layout';
import {Image, Text} from '@rneui/base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialIcon} from '../components/icon/icon';
import {fontFamily} from '../styles/font';
import {getUser} from '../utils/AuthToken';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextInput} from 'react-native-gesture-handler';
import {editUser, updateAvatar} from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {apiUrl, server} from '../utils/api';

interface IUser {
  name: string;
  email: string;
  ddd: string;
  phone: string;
  id: string;
  picture: string;
}

const EditProfileScreen = ({navigation}: any) => {
  const [user, setUser] = useState({} as IUser);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmitForm = async (values: any) => {
    console.log(values, 'values');

    try {
      const response = await editUser({...values, id: user.id});

      console.log(response.data, 'response');

      if (response?.data) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));

        setTimeout(() => {
          navigation.replace('Profile');
        }, 1000);
      }
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const handleSelectImage = async () => {
    launchImageLibrary({mediaType: 'photo'}, async (response: any) => {
      if (!response.didCancel && !response?.error) {
        const avatarData = new FormData();
        avatarData.append('picture', {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });

        try {
          const res = await updateAvatar(user.id, avatarData);
          console.log(res.data, 'res');
          if (res?.data) {
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            console.log(`${apiUrl}${user.picture}`);
            setUser(prevValue => ({...prevValue, picture: res.data.picture}));
          }
        } catch (err) {
          // Handle error
          console.log(err, 'err');
        }
      }
    });
  };

  useEffect(() => {
    const handleGetUser = async () => {
      const currentUser = await getUser();

      console.log(currentUser, 'currentUser');
      if (currentUser) {
        setUser(currentUser);
      }

      console.log(user?.name);
    };

    handleGetUser();
  }, []);

  return (
    <Layout>
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          maxWidth: '100%',
          paddingHorizontal: 20,
          marginTop: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            position: 'relative',
          }}>
          <View>
            {user.picture ? (
              <Image
                source={{uri: `${apiUrl}${user.picture}`}}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 120,
                }}
              />
            ) : (
              <MaterialIcon name="account-circle" size={120} color="#CCC" />
            )}
            <TouchableOpacity
              onPress={handleSelectImage}
              style={{
                backgroundColor: '#8612A7',
                borderRadius: 50,
                padding: 5,
                alignSelf: 'flex-start',
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}>
              <MaterialIcon name="pencil-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {user?.id ? (
          <Formik
            validateOnMount={true}
            validateOnBlur={true}
            initialValues={{
              name: user?.name,
              email: user?.email,
              password: '',
              ddd: user?.ddd,
              phone: user?.phone,
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
                  <Text style={styles.label}>Nome</Text>
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
                <Text style={styles.label}>Email</Text>
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
                        <Text style={styles.inputErrorText}>
                          {errors.email}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <Text style={styles.label}>Celular</Text>
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
                        <Text style={styles.inputErrorText}>
                          {errors.phone}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.row}>
                  <View
                    style={{
                      ...styles.inputContainer,
                      marginBottom:
                        touched.password && errors.password ? 12 : 0,
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
                    Salvar alterações
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        ) : null}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F3F6',
    flexGrow: 2,
    borderRadius: 40,
    width: '100%',
    paddingVertical: 10,
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
    marginBottom: 5,
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
    fontFamily: fontFamily,
    opacity: 1,
    marginBottom: -5,
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

export default EditProfileScreen;
