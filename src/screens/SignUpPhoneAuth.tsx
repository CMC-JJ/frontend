import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {ArrowBack, FormHeader, PhoneAuth, SignButton} from '../components';
import {useVerifyCode} from '../hooks';
import {useSignUpStore} from '../store';
import {convertPhoneNumberFormat, request} from '../utils';
import {RootStackNavigationProp} from './RootStack';

export function SignUpPhoneAuth() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    signUpForm: {phoneNumber},
    initializeSignUpForm,
  } = useSignUpStore();

  useEffect(() => {
    initializeSignUpForm();
  }, [initializeSignUpForm]);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {verifyCode, setVerifyCode, isVerifyCodeValid} = useVerifyCode();

  const onPressNext = async () => {
    Keyboard.dismiss();

    const result = await request(
      'web/auth/phone/verify',
      {verifyCode, phoneNumber: convertPhoneNumberFormat(phoneNumber)},
      'GET',
    );

    if (result.isSuccess) {
      setIsSuccess(true);
      navigation.navigate('SignUp');
    } else {
      Alert.alert(result.message);
    }
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <FormHeader text={'회원가입을 위한\n전화번호를 입력해주세요.'} />
      <View style={styles.form}>
        <PhoneAuth
          isSignUp
          isSuccess={isSuccess}
          verifyCode={verifyCode}
          setVerifyCode={setVerifyCode}
        />
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid={isVerifyCodeValid}
          buttonText="다음"
          onPress={onPressNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  form: {
    flex: 1,
    padding: 25,
    paddingTop: 0,
  },
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
  },
});
