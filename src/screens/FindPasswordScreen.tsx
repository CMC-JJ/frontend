import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  ArrowBack,
  BottomBorderedInput,
  FormHeader,
  PhoneAuth,
  SignButton,
} from '../components';
import {useVerifyCode} from '../hooks';
import {useSignUpStore} from '../store';
import {convertPhoneNumberFormat, request} from '../utils';
import {RootStackNavigationProp} from './RootStack';

export function FindPasswordScreen() {
  const {signUpForm, setSignUpForm} = useSignUpStore();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {verifyCode, setVerifyCode, isVerifyCodeValid} = useVerifyCode();

  const onPressNext = async () => {
    Keyboard.dismiss();

    const result = await request(
      'web/auth/id-phonenumber',
      {
        userName: signUpForm.userName,
        phoneNumber: convertPhoneNumberFormat(signUpForm.phoneNumber),
      },
      'GET',
    );

    if (result.isSuccess) {
      setIsSuccess(true);
      navigation.navigate('FindPasswordComplete', {
        userId: result.result.userId,
      });
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
      <FormHeader text={'비밀번호를 찾기 위한 정보를\n입력해 주세요.'} />
      <View style={styles.form}>
        <BottomBorderedInput
          hasMarginBottom
          isCharacterExisted={signUpForm.userName.length > 0}
          value={signUpForm.userName}
          onChangeText={text => setSignUpForm('userName', text)}
          placeholder="아이디"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <PhoneAuth
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
    paddingHorizontal: 25,
  },
});
