import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontText} from './FontText';

type FormHeaderProps = {
  text: string;
};

export function FormHeader({text}: FormHeaderProps) {
  return (
    <View style={styles.container}>
      <FontText style={styles.header}>{text}</FontText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    paddingTop: 20,
    paddingHorizontal: 28,
  },
  header: {
    marginTop: 20,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 34,
    color: 'black',
  },
});
