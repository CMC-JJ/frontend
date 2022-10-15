import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowBack,
  BottomBorderedInput,
  FormHeader,
  SignButton,
} from '../components';
import {
  AUTHENTICATION_TIME,
  AUTH_NUMBER_LENGTH,
  PHONE_NUMBER_INPUT_LENGTH,
} from '../constants';
import {useAuthTimer, useIsPhoneNumberValid, useVerifyCode} from '../hooks';
import {useSignUpStore} from '../store';
import {
  convertPhoneNumberFormat,
  forceNumber,
  convertNumberToMMSS,
  request,
} from '../utils';
import {RootStackNavigationProp} from './RootStack';

export function PhoneAuthScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    signUpForm: {phoneNumber},
    setSignUpForm,
    initializeSignUpForm,
  } = useSignUpStore();

  // 데이터 초기화
  useEffect(() => {
    initializeSignUpForm();
  }, [initializeSignUpForm]);

  const isPhoneNumberValid = useIsPhoneNumberValid(phoneNumber);
  const [didPressAuthButton, setDidPressAuthButton] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {time, setTime} = useAuthTimer(isSuccess, didPressAuthButton);

  const onPressAuth = async () => {
    Alert.alert('인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해주세요.');

    if (!didPressAuthButton) {
      setDidPressAuthButton(true);
    }

    setTime(AUTHENTICATION_TIME);

    setSignUpForm('phoneNumber', convertPhoneNumberFormat(phoneNumber));

    await request(
      'web/auth/phone',
      {phoneNumber: convertPhoneNumberFormat(phoneNumber)},
      'POST',
    );
  };

  const {verifyCode, setVerifyCode, isVerifyCodeValid} = useVerifyCode();

  const onPressNext = async () => {
    const result = await request(
      'web/auth/phone/verify',
      {verifyCode, phoneNumber: convertPhoneNumberFormat(phoneNumber)},
      'GET',
    );

    // 임시 코드
    if (true) {
      setIsSuccess(true);
      navigation.navigate('SignUp');
    } else {
      Alert.alert(result.message);
    }

    // 원래 코드
    // if (result.isSuccess) {
    //   navigation.navigate('SignUp');
    // } else {
    //   Alert.alert(result.message);
    // }
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        <ArrowBack size={28} />
      </View>
      <FormHeader text={'회원가입을 위한\n전화번호를 입력해주세요.'} />
      <View style={styles.form}>
        <BottomBorderedInput
          value={convertPhoneNumberFormat(phoneNumber)}
          onChangeText={(text: any) => {
            setSignUpForm('phoneNumber', forceNumber(text));
          }}
          placeholder="전화번호"
          keyboardType="phone-pad"
          maxLength={PHONE_NUMBER_INPUT_LENGTH}
        />
        <View style={didPressAuthButton && styles.none}>
          <Text style={styles.warning}>
            *개인정보 보안을 위해 보인이 직접 사용하는 휴대폰으로 인증해주세요.
          </Text>
          <View style={styles.verifyCode}>
            <SignButton
              isValid={isPhoneNumberValid}
              buttonText="인증번호 받기"
              onPress={onPressAuth}
            />
          </View>
        </View>
        <View style={!didPressAuthButton && styles.none}>
          <View style={styles.verifyCodeInputContainer}>
            <BottomBorderedInput
              value={verifyCode}
              onChangeText={(text: any) => {
                setVerifyCode(forceNumber(text));
              }}
              placeholder="인증번호"
              keyboardType="phone-pad"
              maxLength={AUTH_NUMBER_LENGTH}
              style={styles.verifyCodeInput}
            />
            <TouchableOpacity
              onPress={onPressAuth}
              style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>재전송</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.timelimit}>
            제한시간: {convertNumberToMMSS(time)}
          </Text>
        </View>
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
  warning: {
    marginTop: 8,
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21,
    color: '#7C7C7C',
  },
  verifyCode: {
    marginTop: 8,
    alignItems: 'center',
  },
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
  },
  none: {
    display: 'none',
  },
  verifyCodeInputContainer: {
    marginTop: 50,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verifyCodeInput: {
    flex: 0.6,
  },
  buttonContainer: {
    flex: 0.3,
  },
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,

    height: 40,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
  },
  timelimit: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 34,

    color: '#000000',
  },
});
