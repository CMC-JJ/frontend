import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {ArrowBack, FormHeader} from '../components';

export function SignUpScreen() {
  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        <ArrowBack size={28} />
      </View>
      <FormHeader text={'회원가입을 위한 아이디와\n비밀번호를 입력해주세요.'} />
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
    paddingTop: 0,
  },
});
