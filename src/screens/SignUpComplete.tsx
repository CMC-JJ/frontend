import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ArrowBack, SignButton} from '../components';
import {useAuthStore, useSignUpStore} from '../store';
import {request} from '../utils';
import {RootStackNavigationProp} from './RootStack';

export function SignUpComplete() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {signUpForm, initializeSignUpForm} = useSignUpStore();
  const {setAuth} = useAuthStore();
  const onPress = async () => {
    Keyboard.dismiss();

    const result = await request(
      'web/users',
      {
        phoneNumber: signUpForm.phoneNumber,
        userName: signUpForm.userName,
        password: signUpForm.password,
        nickName: signUpForm.nickName,
      },
      'POST',
    );

    // TODO: 이 부분 backend api 변경되면 signupForm이 아닌 result에서 가져오는것으로 변경!
    if (result.isSuccess) {
      const form = {
        phoneNumber: signUpForm.phoneNumber,
        userName: signUpForm.userName,
        nickName: signUpForm.nickName,
        jwtToken: result.result.jwt,
      };

      setAuth(form);
      initializeSignUpForm();
      navigation.navigate('MainTab');
    } else {
      Alert.alert(result.message);
    }
  };

  console.log(signUpForm);

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>안녕하세요 줄리!</Text>
        <Text style={styles.welcome}>가치가자 회원이 되신걸 환영합니다.</Text>
      </View>
      <View style={styles.centerImage}>
        <View style={styles.box} />
      </View>
      <View style={styles.footer}>
        <SignButton isValid buttonText="가치가자 시작하기" onPress={onPress} />
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
  header: {
    flex: 0.5,
    paddingTop: 20,
    paddingHorizontal: 28,
    marginTop: 20,
  },
  name: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 34,
    color: '#0066FF',
  },
  welcome: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 34,

    color: '#121212',
  },
  centerImage: {
    flex: 1.5,

    paddingTop: 0,
    paddingHorizontal: 80,
  },
  box: {
    borderColor: 'black',
    borderWidth: 2,
    height: 300,
  },
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
  },
});
