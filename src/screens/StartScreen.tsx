import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignButton} from '../components';
import FontText from '../components/FontText';

export default function StartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: 100, height: 100, backgroundColor: 'yellow'}} />

      <FontText style={styles.header}>
        {
          "'같이'의 가치를 실현하다\n한눈에 보고 간편하게 신청하는\n교통약자 서비스"
        }
      </FontText>
      <SignButton style={styles.buttonGap} buttonText="로그인" isValid />
      <SignButton buttonText="회원가입" isValid isbackgroundWhite />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 80,
  },
  header: {
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 34,
    color: 'black',
    marginTop: 34,
  },
  buttonGap: {
    marginBottom: 18,
  },
});
