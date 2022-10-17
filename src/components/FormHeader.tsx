import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type FormHeaderProps = {
  text: string;
};

export function FormHeader({text}: FormHeaderProps) {
  return (
    <View style={styles.container}>
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
