import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontText} from './FontText';

type TabHeaderProps = {
  text: string;
};

export function TabHeader({text}: TabHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <FontText style={styles.header}>{text}</FontText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40,
    paddingHorizontal: 25,
  },
  header: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 34,
    color: 'black',
  },
});
