import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack} from '../components';

export function FindIdScreen() {
  return (
    <SafeAreaView style={styles.fill}>
      <Text>아이디 찾기 페이지</Text>
      <ArrowBack size={28} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
});
