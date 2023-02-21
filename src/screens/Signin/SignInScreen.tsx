import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {SignInForm, HeaderTitle, Button} from '@/components';
import {useAuthStore, useSignUpStore} from '@/store';
import {request} from '@/utils';
import type {RootStackNavigationProp} from '@/screens';
import AsyncStorage from '@react-native-community/async-storage';
import {COLOR, TYPOGRAPHY} from '@/constants';
import {GeneralView} from '@/layouts';

type Form = {
  userName: string;
  password: string;
};

export function SignInScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {initializeSignUpForm} = useSignUpStore();
  const {setAuth} = useAuthStore();

  const [form, setForm] = useState<Form>({
    userName: '',
    password: '',
  });
  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  // TODO: 자동 로그인 활용한 로직 추가 필요 (한번 로그인 하면 30일간 자동로그인 하게)
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  useEffect(() => {
    setIsFormValid(
      form.userName.trim().length >= 1 && form.password.trim().length >= 1,
    );
  }, [form.password, form.userName]);

  const onSubmit = async () => {
    Keyboard.dismiss();

    const result = await request(
      'web/auth/sign-in',
      {
        userName: form.userName,
        password: form.password,
      },
      'POST',
    );

    if (result.isSuccess) {
      const authForm = {
        phoneNumber: result.result.phoneNumber,
        userId: result.result.userId,
        nickName: result.result.nickName,
        userName: result.result.userName,
        jwtToken: result.result.jwt,
      };
      setAuth(authForm);
      AsyncStorage.setItem('user', JSON.stringify({user: authForm}));
      initializeSignUpForm();
      navigation.navigate('MainTab', {screen: 'Home'});
    } else {
      Alert.alert(result.message);
    }
  };

  return (
    <GeneralView>
      <KeyboardAvoidingView
        style={styles.fill}
        behavior="padding"
        keyboardVerticalOffset={20}>
        <HeaderTitle text={'아이디와 비밀번호를\n입력해주세요.'} />
        <View style={styles.form}>
          <SignInForm
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <View style={styles.findAccount}>
            <Pressable onPress={() => navigation.navigate('FindId')}>
              <Text style={styles.findId}>아이디 찾기</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('FindPassword')}>
              <Text style={styles.findPassword}>비밀번호 찾기</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.footer}>
          <Button text="로그인" isValid={isFormValid} onPress={onSubmit} />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footerQuestion}>
        <Text style={styles.question}>아직 가치가자 회원이 아니세요?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('PhoneAuth');
          }}
          style={styles.signup}>
          <Text style={styles.signupText}>회원가입</Text>
        </Pressable>
      </View>
    </GeneralView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    marginBottom: 20,
  },
  form: {
    marginTop: 65,
    paddingHorizontal: 25,
  },
  findAccount: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  findId: {
    color: COLOR['GC-700'],
    ...TYPOGRAPHY.BT4,
    textDecorationLine: 'underline',
  },
  findPassword: {
    marginLeft: 10,
    color: COLOR['GC-700'],
    ...TYPOGRAPHY.BT4,
    textDecorationLine: 'underline',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
  },
  footerQuestion: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  question: {
    color: COLOR['GC-700'],
    ...TYPOGRAPHY.BT4,
  },
  signup: {
    marginLeft: 12,
  },
  signupText: {
    color: COLOR['GC-950'],
    ...TYPOGRAPHY.BT4,
    textDecorationLine: 'underline',
  },
});
