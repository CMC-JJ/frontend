import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Keyboard,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack, SignButton, FormHeader, SignInForm} from '@/components';
import {useAuthStore, useSignUpStore} from '@/store';
import {request} from '@/utils';
import type {RootStackNavigationProp} from '@/screens';
import AsyncStorage from '@react-native-community/async-storage';

export function SignInScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {initializeSignUpForm} = useSignUpStore();
  const {setAuth} = useAuthStore();

  const [form, setForm] = useState({
    userName: '',
    password: '',
  });

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  // TODO: 자동 로그인 활용한 로직 추가 필요
  // 스플래시 뜨면 바로 메인화면
  // 자동로그인이 아닌 경우 다시 로그인
  // 자동로그인 API를 활용하여 여기서 검증 실패하면 로그인 화면
  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState<boolean>(false);

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
      isCheckBoxSelected === true &&
        AsyncStorage.setItem('user', JSON.stringify({user: authForm}));
      initializeSignUpForm();
      navigation.navigate('MainTab', {screen: 'Home'});
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
      <FormHeader text={'아이디와 비밀번호를\n입력해주세요.'} />
      <View style={styles.form}>
        <SignInForm
          form={form}
          createChangeTextHandler={createChangeTextHandler}
        />
        <View style={styles.memberContainer}>
          <View style={styles.autologin}>
            {Platform.OS === 'ios' ? (
              <CheckBox
                value={isCheckBoxSelected}
                onValueChange={setIsCheckBoxSelected}
                boxType="square"
                onTintColor="#7C7C7C"
                onFillColor="#121212"
                onCheckColor="#FFF9F9"
                lineWidth={1}
                onAnimationType="fade"
                offAnimationType="fade"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                }}
              />
            ) : (
              <CheckBox
                value={isCheckBoxSelected}
                onValueChange={setIsCheckBoxSelected}
                boxType="square"
                tintColors={{
                  true: '#121212',
                  false: '#7C7C7C',
                }}
                style={{
                  marginLeft: -7,
                }}
              />
            )}
            <Text style={styles.autologinText}>자동 로그인</Text>
          </View>
          <View style={styles.findAccount}>
            <Text
              onPress={() => {
                navigation.navigate('FindId');
              }}
              style={styles.findId}>
              아이디 찾기
            </Text>
            <Text
              onPress={() => {
                navigation.navigate('FindPassword');
              }}
              style={styles.findPassword}>
              비밀번호 찾기
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid={isFormValid}
          buttonText="로그인"
          onPress={onSubmit}
        />
        <View style={styles.footerQuestion}>
          <Text style={styles.question}>아직 가치가자 회원이 아니세요?</Text>
          <Text
            onPress={() => {
              navigation.navigate('PhoneAuth');
            }}
            style={styles.signup}>
            회원가입
          </Text>
        </View>
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
  },
  memberContainer: {
    marginTop: 20,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    color: '#7C7C7C',
  },
  autologin: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  autologinText: {
    color: '#7C7C7C',
  },
  findAccount: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  findId: {
    color: '#7C7C7C',
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  findPassword: {
    color: '#7C7C7C',
    textDecorationLine: 'underline',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

    paddingHorizontal: 25,
  },
  footerQuestion: {
    flexDirection: 'row',

    padding: 10,
    paddingTop: 20,
  },
  question: {
    fontFamily: 'Pretendard',
    color: '#121212',

    paddingRight: 12,
  },

  signup: {
    fontFamily: 'Pretendard',
    color: '#121212',
    textDecorationLine: 'underline',
  },
});
