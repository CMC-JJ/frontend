import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ArrowBack, SignButton} from '@/components';
import {useAuthStore, useSignUpStore} from '@/store';
import {request} from '@/utils';
import type {RootStackNavigationProp} from '@/screens';

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

    if (result.isSuccess) {
      const form = {
        phoneNumber: result.result.phoneNumber,
        userId: result.result.createdUserId,
        nickName: result.result.nickName,
        userName: result.result.userName,
        jwtToken: result.result.jwt,
      };

      setAuth(form);
      initializeSignUpForm();
      navigation.navigate('MainTab', {screen: 'Home'});
    } else {
      Alert.alert(result.message);
    }
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="#0066FF" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} color="white" />}
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>안녕하세요 {signUpForm.nickName}!</Text>
        <Text style={styles.welcome}>가치가자 회원이 되신걸 환영합니다.</Text>
      </View>
      <View style={styles.centerImage}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/signupCongratulation.png')}
        />
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid
          buttonText="가치가자 시작하기"
          onPress={onPress}
          isbackgroundWhite
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#0066FF',
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
    color: 'white',
  },
  welcome: {
    marginTop: 8,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 34,

    color: 'white',
  },
  centerImage: {
    flex: 1.5,

    marginTop: -70,
    justifyContent: 'center',
    marginLeft: 60,
  },
  logo: {
    width: 230,
    height: 190,
  },
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
    paddingHorizontal: 25,
  },
});
