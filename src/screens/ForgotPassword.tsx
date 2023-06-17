import React, {useEffect, useRef, useState} from 'react';
import {Text} from '@rneui/base';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MaterialIcon} from '../components/icon/icon';
import {Formik, useFormikContext} from 'formik';
import * as yup from 'yup';
import {fontFamily} from '../styles/font';
import {TextInputMask} from 'react-native-masked-text';
import {checkVerification, sendSmsVerification} from '../services/twilio';
import LoadingBar from '../components/loading-bar/LoadingBar';
import * as RootNavigaton from '../utils/RootNavigation';
import {useRoute} from '@react-navigation/native';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [showVerification, setShowVerification] = useState(false);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const route = useRoute();

  const handleSubmitForm = async (_values: any) => {
    console.log(_values, '_values');

    try {
      setIsLoading(true);
      setIsError(false);
      const _phone = `+55${_values.ddd}${_values.phone.replace('-', '')}`;
      const response = await sendSmsVerification(_phone);
      if (response?.status === 200) {
        setPhone(_phone);
        setShowVerification(true);
      }
      console.log(response.status);
    } catch (err) {
      console.log(JSON.stringify(err), 'err');
    } finally {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setIsError(false);
    setIsLoading(false);
    setShowVerification(false);
  }, [route.name]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          paddingTop: 65,
          paddingHorizontal: 24,
          paddingBottom: 40,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          flexDirection: 'column',
          height: '100%',
          flexGrow: 1,
          flex: 1,
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
          <Text style={{fontFamily, fontWeight: '700', fontSize: 13}}>
            Esqueci minha senha
          </Text>
        </View>
        {showVerification ? (
          <ForgotPasswordVerifyCode
            handleResetProcess={() => setShowVerification(false)}
            phone={phone}
          />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'column',
                gap: 30,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexGrow: 1,
              }}>
              <View
                style={{
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/images/forgot-password.png')}
                  style={{
                    width: 220,
                    height: 220,
                  }}
                />
              </View>
              <View
                style={{
                  gap: 4,
                }}>
                <Text style={{fontFamily, fontWeight: '600', fontSize: 20}}>
                  Esqueci minha senha
                </Text>
                <Text
                  style={{
                    fontFamily,
                    fontWeight: '400',
                    fontSize: 15,
                    lineHeight: 22,
                  }}>
                  Insira um número de celular com DDD, que enviaremos um código
                  para recuperação de senha.
                </Text>
              </View>
            </View>
            <Formik
              validateOnMount={true}
              validateOnBlur={true}
              initialValues={{
                ddd: '',
                phone: '',
              }}
              onSubmit={values => handleSubmitForm(values)}
              validationSchema={yup.object().shape({
                ddd: yup
                  .string()
                  .matches(/^\d{0,2}$/, 'DDD Inválido')
                  .required('Insira seu DDD'),
                phone: yup
                  .string()
                  .matches(/^\d{0,5}-?\d{0,4}$/, 'Celular Inválido')
                  .required('Insira seu Celular'),
              })}>
              {({
                handleChange,
                errors,
                isValid,
                handleSubmit,
                touched,
                setFieldTouched,
              }) => (
                <ForgotPasswordForm
                  handleChange={handleChange}
                  errors={errors}
                  isValid={isValid}
                  handleSubmit={handleSubmit}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                  isLoading={isLoading}
                  isError={isError}
                />
              )}
            </Formik>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const ForgotPasswordForm = ({
  handleChange,
  errors,
  isValid,
  handleSubmit,
  touched,
  setFieldTouched,
  isLoading,
  isError,
}: any) => {
  const {values} = useFormikContext() as any;

  useEffect(() => {
    try {
      if (values?.ddd?.length === 2 && phoneRef?.current?.getElement()) {
        phoneRef?.current?.getElement().focus();
      }
    } catch {
      console.log('not able to focus');
    }
  }, [values.ddd]);

  const phoneRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <View style={styles.rowInline}>
        <View
          style={{
            ...styles.inputContainerInline,
            flexGrow: 0,
            width: 99,
            marginBottom: touched?.ddd && errors.ddd ? 12 : 0,
          }}>
          <TextInputMask
            value={values?.ddd}
            style={styles.input}
            onChangeText={handleChange('ddd')}
            onBlur={() => setFieldTouched('ddd')}
            placeholder="DDD"
            autoCapitalize="none"
            keyboardType="numeric"
            type={'custom'}
            options={{
              mask: '99',
            }}
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
          <TextInputMask
            ref={phoneRef}
            value={values?.phone}
            style={styles.input}
            onChangeText={handleChange('phone')}
            onBlur={() => setFieldTouched('phone')}
            placeholder="Celular"
            autoCapitalize="none"
            keyboardType="numeric"
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: false,
            }}
          />
          <View style={styles.inputError}>
            {touched.phone && errors.phone && (
              <Text style={styles.inputErrorText}>{errors.phone}</Text>
            )}
          </View>
        </View>
      </View>
      {isError ? (
        <Text
          style={{
            color: '#F0614D',
            fontFamily: fontFamily,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            textAlign: 'left',
            alignItems: 'flex-start',
            width: '100%',
            marginTop: -10,
          }}>
          Não foi possível enviar o código. Tente novamente em alguns segundos.
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: isValid && !isLoading ? '#8612A7' : '#F4E8F8',
          width: '100%',
          paddingVertical: 12,
          borderRadius: 8,
          height: 56,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
        disabled={!isValid || isLoading}>
        <Text
          style={{
            textAlign: 'center',
            color: isValid ? '#FFF' : '#A69CA9',
            fontFamily,
            fontWeight: 'bold',
          }}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ForgotPasswordVerifyCode = ({handleResetProcess, phone}: any) => {
  const [showSMSCode, setShowSMSCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSMSCode(true);
    }, 9500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const codeString = verificationCode.join('');
    const isFilled = codeString.length === 4;
    setIsValid(isFilled);
  }, [verificationCode]);

  const handleVerificationCodeChange = (text: any, index: any) => {
    const cleanedCode = text.replace(/\D/g, '');
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[index] = cleanedCode;
    setVerificationCode(updatedVerificationCode);

    if (cleanedCode.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspacePress = (event: any, currentIndex: any) => {
    try {
      const {nativeEvent} = event;
      console.log(verificationCode[currentIndex].length);
      if (
        nativeEvent.key === 'Backspace' &&
        verificationCode[currentIndex].length === 0
      ) {
        if (currentIndex > 0) {
          const previousInputRef = inputRefs.current[currentIndex - 1];
          previousInputRef.focus();
        }
      }
    } catch {
      console.log('not able to focus');
    }
  };

  const handleSubmit = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await checkVerification(
        phone,
        verificationCode.join(''),
      );
      if (response?.status === 200) {
        RootNavigaton.navigate('NewPassword');
      }
      console.log(response.status);
    } catch (err) {
      setIsError(true);
      console.log(JSON.stringify(err), 'err');
    } finally {
      setIsLoading(false);
    }
  };

  return !showSMSCode ? (
    <View style={stylesVerify.container}>
      <View style={stylesVerify.imageContainer}>
        <Image
          source={require('../assets/images/resend-code.png')}
          style={stylesVerify.image}
        />
      </View>
      <View style={stylesVerify.textContainer}>
        <Text style={stylesVerify.title}>Verifique sua caixa de SMS</Text>
        <Text style={stylesVerify.subtitle}>
          Enviamos um SMS para você recuperar a sua senha. Por favor, verifique
          a sua caixa de mensagens.
        </Text>
      </View>
      <LoadingBar />
    </View>
  ) : (
    <View style={stylesVerify.container}>
      <View style={stylesVerify.imageContainer}>
        <Image
          source={require('../assets/images/safe-code.png')}
          style={stylesVerify.image}
        />
      </View>
      <View style={stylesVerify.textContainer}>
        <Text style={stylesVerify.title}>Código de segurança</Text>
        <Text style={stylesVerify.subtitle}>
          Por favor, digite o código de segurança enviado.
        </Text>
      </View>
      <View style={stylesVerify.codeInputContainer}>
        {verificationCode.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={{
              ...stylesVerify.inputDigit,
              borderColor: isError ? '#F0614D' : '#8612A7',
              borderWidth: isError ? 1 : 0,
              color: isError ? '#F0614D' : '#23052C',
            }}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={text => handleVerificationCodeChange(text, index)}
            onKeyPress={e => handleBackspacePress(e, index)} // Handle the key press event for backspace
          />
        ))}
      </View>
      {isError ? (
        <Text
          style={{
            color: '#F0614D',
            fontFamily: fontFamily,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            textAlign: 'left',
            alignItems: 'flex-start',
            width: '100%',
            marginTop: -10,
          }}>
          Código incorreto
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={handleResetProcess}
        style={{
          justifyContent: 'flex-start',
          width: '100%',
        }}>
        <Text
          style={{
            color: '#8612A7',
            textDecorationLine: 'underline',
            fontFamily: fontFamily,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            textAlign: 'left',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          Não recebi o código
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: isValid && !isLoading ? '#8612A7' : '#F4E8F8',
          width: '100%',
          paddingVertical: 12,
          borderRadius: 8,
          height: 56,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
        disabled={!isValid || isLoading}>
        <Text
          style={{
            textAlign: 'center',
            color: isValid ? '#FFF' : '#A69CA9',
            fontFamily,
            fontWeight: 'bold',
          }}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const stylesVerify = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
  textContainer: {
    gap: 4,
    width: '100%',
  },
  title: {
    fontFamily,
    fontWeight: '600',
    fontSize: 20,
  },
  subtitle: {
    fontFamily,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  inputDigit: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily,
    fontWeight: '600',
    marginHorizontal: 5,
    height: 60,
    flexGrow: 1,
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
  },
  submitButton: {
    backgroundColor: '#F4E8F8',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    height: 56,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    textAlign: 'center',
    fontFamily,
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  timerBar: {
    backgroundColor: '#ECECEC',
    height: 4,
    width: '100%',
    borderRadius: 2,
  },
  timerProgress: {
    backgroundColor: '#8612A7',
    height: '100%',
    borderRadius: 2,
  },
  timerText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  inputDigit: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 40,
    height: 40,
    margin: 5,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#F6F3F6',
    flexGrow: 0,
    borderRadius: 40,
    width: '100%',
    paddingVertical: 40,
    paddingBottom: 15,
    gap: 20,
    justifyContent: 'space-between',
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
    bottom: -25,
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
    fontFamily: fontFamily,
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

export default ForgotPasswordScreen;
