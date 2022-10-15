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
  convertPhoneNumberFormat,
  forceNumber,
  isValidNumberLength,
  convertNumberToMMSS,
  request,
} from '../utils';
import {RootStackNavigationProp} from './RootStack';

const PHONE_NUMBER_INPUT_LENGTH = 13;
const PHONE_NUMBER_LENGTH = 11;
const AUTH_NUMBER_LENGTH = 6;
const AUTHENTICATION_TIME = 180;

export function PhoneAuthScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);

  useEffect(() => {
    setIsPhoneNumberValid(
      isValidNumberLength(phoneNumber, PHONE_NUMBER_LENGTH),
    );
  }, [phoneNumber]);

  const [didPressAuthButton, setDidPressAuthButton] = useState<boolean>(false);

  const onPressAuthButton = async () => {
    Alert.alert('인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해주세요.');
    setDidPressAuthButton(true);

    await request(
      'web/auth/phone',
      {phoneNumber: convertPhoneNumberFormat(phoneNumber)},
      'POST',
    );
  };

  const [verifyCode, setVerifyCode] = useState<string>('');
  const [isVerifyCodeValid, setIsVerifyCodeValid] = useState<boolean>(false);
  const [time, setTime] = useState<number>(AUTHENTICATION_TIME);

  useEffect(() => {
    setIsVerifyCodeValid(isValidNumberLength(verifyCode, AUTH_NUMBER_LENGTH));
  }, [verifyCode]);

  const onPressResend = async () => {
    Alert.alert('인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해주세요.');

    setTime(AUTHENTICATION_TIME);

    await request(
      'web/auth/phone',
      {phoneNumber: convertPhoneNumberFormat(phoneNumber)},
      'POST',
    );
  };

  const onPressNext = async () => {
    const result = await request(
      'web/auth/phone/verify',
      {verifyCode, phoneNumber: convertPhoneNumberFormat(phoneNumber)},
      'GET',
    );

    // 임시 코드
    if (true) {
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

  useEffect(() => {
    if (time > 0) {
      return;
    }
    Alert.alert('인증시간이 만료되었습니다. 다시 인증해주세요.');
  }, [time]);

  useEffect(() => {
    if (didPressAuthButton) {
      if (time > 0) {
        const interval = setInterval(() => {
          setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [didPressAuthButton, time]);

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
            setPhoneNumber(forceNumber(text));
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
              onPress={onPressAuthButton}
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
              onPress={onPressResend}
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
