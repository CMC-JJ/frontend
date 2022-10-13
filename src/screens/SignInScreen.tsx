import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack, SignButton, FormHeader, SignInForm} from '../components';
import {RootStackNavigationProp} from './RootStack';

export function SignInScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  // 자동 로그인 활용한 로직 추가 필요
  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState<boolean>(false);

  // 폼 validation 체크 현재는 간단하게 하고 있지만 자세하게 필요!
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsFormValid(
      form.username.trim().length >= 1 && form.password.trim().length >= 1,
    );
  }, [form.password, form.username]);

  // 로그인 정보 서버로 보내는 로직 구현 필요
  // 이 부분은 backend와 상의를 다 한 후 구현하겠습니다.
  // const onSubmit = async () => {
  //   Keyboard.dismiss();
  // };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        <ArrowBack size={28} />
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
        <SignButton isValid={isFormValid} buttonText="로그인" />
        <View style={styles.footerQuestion}>
          <Text style={styles.question}>아직 가치자가 회원이 아니세요?</Text>
          <Text
            onPress={() => {
              navigation.navigate('SignUp');
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
