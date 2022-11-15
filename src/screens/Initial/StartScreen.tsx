import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignButton, FontText} from '@/components';
import {RootStackNavigationProp} from '@/screens';
import {useNavigation} from '@react-navigation/native';
import {data} from '@/assets/texts/TermsText';

export function StartScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/loginLogo.png')}
        />
        <FontText style={styles.header}>
          {'설레는 항공여행\n가치가자와\n쉽고 빠르게 떠나요'}
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
            onPress={() => navigation.navigate('PhoneAuth')}
          />
        </View>
        <View style={styles.footer}>
          <FontText style={styles.text}>
            {"'시작하기'를 누르는 것으로 "}

            <FontText
              onPress={() =>
                navigation.navigate('Terms', {
                  title: data[1].title,
                  text: data[1].text,
                })
              }
              style={styles.textLine}>
              {'서비스 이용약관'}
            </FontText>
            <FontText style={styles.text}>{'과\n'}</FontText>
            <FontText
              onPress={() =>
                navigation.navigate('Terms', {
                  title: data[2].title,
                  text: data[2].text,
                })
              }
              style={styles.textLine}>
              {'개인정보 처리 방침'}
            </FontText>
            <FontText style={styles.text}>
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
    width: '100%',
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
