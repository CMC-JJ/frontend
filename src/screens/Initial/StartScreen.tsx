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
    <SafeAreaView style={styles.fill}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/loginLogo.png')}
        />

        <FontText style={styles.header}>
          {
            "'같이'의 가치를 실현하다\n한눈에 보고 간편하게 신청하는\n교통약자 서비스"
          }
        </FontText>
        <View style-={styles.button}>
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
        </View>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 25,
    marginTop: 80,
  },

  header: {
    flex: 1,
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 34,
    color: 'black',
    marginTop: 10,
  },
  logo: {
    marginLeft: -9,
  },
  button: {flex: 1},
  buttonGap: {
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
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});
