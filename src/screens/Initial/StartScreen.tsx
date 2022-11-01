import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignButton} from '@/components';
import FontText from '@/components/FontText';
import {RootStackNavigationProp} from '@/screens';
import {useNavigation} from '@react-navigation/native';

export function StartScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          marginTop: 80,
          marginLeft: -9,
        }}
        source={require('@/assets/images/logo.png')}
      />

      <FontText style={styles.header}>
        {
          "'같이'의 가치를 실현하다\n한눈에 보고 간편하게 신청하는\n교통약자 서비스"
        }
      </FontText>
      <SignButton
        style={styles.buttonGap}
        buttonText="로그인"
        isValid
        onPress={() => navigation.navigate('SignIn')}
      />
      <SignButton
        buttonText="회원가입"
        isValid
        isbackgroundWhite
        onPress={() => navigation.navigate('SignUp')}
      />
      <View style={styles.footer}>
        <FontText style={styles.text}>
          {"'시작하기'를 누르는 것으로 "}
          <FontText style={styles.textLine}>{'서비스 이용약관'}</FontText>
          <FontText>{'과\n'}</FontText>
          <FontText style={styles.textLine}>{'개인정보 취급 방침'}</FontText>
          <FontText>
            {'에 동의하고\n서비스를 이용하는 것으로 간주합니다.'}
          </FontText>
        </FontText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white',
  },
  header: {
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 34,
    color: 'black',
    marginTop: 34,
  },
  buttonGap: {
    marginTop: 105,
    marginBottom: 18,
  },
  text: {
    textAlign: 'center',
    color: '#878787',
    lineHeight: 20,
  },
  textLine: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
});
