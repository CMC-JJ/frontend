import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SignInForm} from '../components';
import {RootStackNavigationProp} from './RootStack';

function SignInScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState<boolean>(false);
  const [isFormValid] = useState<boolean>(true);

  // 폼이 완성되었을때, isFormValid를 true로 바꿔주는 로직 필요

  // 아이디, 비밀번호 찾기 페이지로 이동하는 라우팅 작성 필요

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        <Icon name="arrow-back" size={28} color="black" />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>
          아이디와 비밀번호를{'\n'}입력해주세요.
        </Text>
      </View>
      <View style={styles.form}>
        <SignInForm />
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
        <TouchableOpacity>
          <View
            style={[
              styles.buttonStyle,
              isFormValid && styles.validButtonStyle,
            ]}>
            <Text
              style={[
                styles.buttonText,
                isFormValid && styles.validButtonText,
              ]}>
              로그인
            </Text>
          </View>
        </TouchableOpacity>
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
  container: {
    flex: 0.5,
    paddingTop: 20,
    paddingHorizontal: 28,
  },
  header: {
    marginTop: 20,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 26,
    color: 'black',
  },
  form: {
    flex: 1,
    padding: 25,
  },
  memberContainer: {
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
  buttonStyle: {
    width: 325,
    height: 56,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,

    alignItems: 'center',
    justifyContent: 'center',
  },
  validButtonStyle: {
    backgroundColor: '#0066FF',
  },
  buttonText: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: '#909397',
  },
  validButtonText: {
    color: 'white',
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

export default SignInScreen;
