import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack, FormHeader, PhoneAuth, SignButton} from '@/components';
import {useVerifyCode} from '@/hooks';
import {useSignUpStore} from '@/store';
import {convertPhoneNumberFormat, request} from '@/utils';
import type {RootStackNavigationProp} from '@/screens';

export function FindIdScreen() {
  const {
    signUpForm: {phoneNumber},
  } = useSignUpStore();
  const navigation = useNavigation<RootStackNavigationProp>();

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

      const res = await request(
        'web/auth/id',
        {phoneNumber: convertPhoneNumberFormat(phoneNumber)},
        'GET',
      );

      if (res.isSuccess) {
        navigation.navigate('FindIdComplete', {
          userName: res.result.userName,
          createdAt: res.result.createdAt,
        });
      } else {
        Alert.alert(res.message);
      }
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
      <FormHeader text={'등록된 전화번호를\n입력해 주세요.'} />
      <View style={styles.form}>
        <PhoneAuth
          isSuccess={isSuccess}
          verifyCode={verifyCode}
          setVerifyCode={setVerifyCode}
        />
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid={isVerifyCodeValid}
          buttonText="확인"
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
    paddingHorizontal: 25,
  },
});
