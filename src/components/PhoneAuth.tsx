import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomBorderedInput, SignButton} from '@/components';
import {
  AUTHENTICATION_TIME,
  AUTH_NUMBER_LENGTH,
  PHONE_NUMBER_INPUT_LENGTH,
} from '@/constants';
import {useAuthTimer, useIsPhoneNumberValid} from '@/hooks';
import {useSignUpStore} from '@/store';
import {
  convertNumberToMMSS,
  convertPhoneNumberFormat,
  forceNumber,
  request,
} from '@/utils';

type PhoneAuthProps = {
  isSignUp?: boolean;
  isSuccess: boolean;
  verifyCode: string;
  setVerifyCode: (text: string) => void;
};

export function PhoneAuth({
  isSignUp = false,
  isSuccess,
  verifyCode,
  setVerifyCode,
}: PhoneAuthProps) {
  const {
    signUpForm: {phoneNumber},
    setSignUpForm,
  } = useSignUpStore();

  const isPhoneNumberValid = useIsPhoneNumberValid(phoneNumber);
  const [didPressAuthButton, setDidPressAuthButton] = useState<boolean>(false);
  const {time, setTime} = useAuthTimer(isSuccess, didPressAuthButton);

  const onPressAuth = async () => {
    Keyboard.dismiss();

    if (isSignUp) {
      setSignUpForm('phoneNumber', convertPhoneNumberFormat(phoneNumber));

      const res = await request(
        'web/auth/duplicate-phonenumber',
        {
          phoneNumber: convertPhoneNumberFormat(phoneNumber),
        },
        'GET',
      );

      if (!res.isSuccess) {
        Alert.alert(res.message);
        return;
      }
    }

    Alert.alert('인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해주세요.');

    if (!didPressAuthButton) {
      setDidPressAuthButton(true);
    }

    setTime(AUTHENTICATION_TIME);

    await request(
      'web/auth/phone',
      {phoneNumber: convertPhoneNumberFormat(phoneNumber)},
      'POST',
    );
  };

  return (
    <>
      <BottomBorderedInput
        isCharacterExisted={phoneNumber.length > 0}
        value={convertPhoneNumberFormat(phoneNumber)}
        onChangeText={(text: string) => {
          setSignUpForm('phoneNumber', forceNumber(text));
        }}
        placeholder="전화번호"
        keyboardType="number-pad"
        maxLength={PHONE_NUMBER_INPUT_LENGTH}
      />
      <View style={didPressAuthButton && styles.none}>
        {isSignUp && (
          <Text style={styles.warning}>
            *개인정보 보안을 위해 본인이 직접 사용하는 휴대폰으로 인증해주세요.
          </Text>
        )}
        <View style={[styles.verifyCode, isSignUp && {marginTop: 8}]}>
          <SignButton
            isValid={isPhoneNumberValid}
            buttonText="인증번호 받기"
            onPress={onPressAuth}
          />
        </View>
      </View>
      <View style={!didPressAuthButton && styles.none}>
        <View style={styles.verifyCodeInputContainer}>
          {Platform.OS === 'android' ? (
            <BottomBorderedInput
              isCharacterExisted={verifyCode.length > 0}
              value={verifyCode}
              onChangeText={(text: string) => {
                setVerifyCode(forceNumber(text));
              }}
              autoComplete="sms-otp"
              placeholder="인증번호"
              keyboardType="number-pad"
              returnKeyType={'done'}
              maxLength={AUTH_NUMBER_LENGTH}
              style={styles.verifyCodeInput}
            />
          ) : (
            <BottomBorderedInput
              isCharacterExisted={verifyCode.length > 0}
              value={verifyCode}
              onChangeText={(text: string) => {
                setVerifyCode(forceNumber(text));
              }}
              placeholder="인증번호"
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              returnKeyType={'done'}
              maxLength={AUTH_NUMBER_LENGTH}
              style={styles.verifyCodeInput}
            />
          )}
          <TouchableOpacity
            onPress={onPressAuth}
            style={[
              styles.buttonContainer,
              Platform.OS === 'android' && {marginTop: 10},
            ]}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>재전송</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.timelimit}>
          제한시간: {convertNumberToMMSS(time)}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  none: {
    display: 'none',
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
    marginTop: 18,
    width: '100%',
    alignItems: 'center',
  },
  verifyCodeInputContainer: {
    marginTop: 50,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verifyCodeInput: {
    flex: 0.65,
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
