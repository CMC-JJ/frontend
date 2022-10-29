import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type TabHeaderProps = {
  text: string;
};

export function TabHeader({text}: TabHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={[
          styles.header,
          Platform.OS === 'android' && {fontWeight: '900'},
        ]}>
        {text}
      </Text>
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
