import {COLOR, TYPOGRAPHY} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';

type HeaderProps = {
  text: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export function Header({text, viewStyle, textStyle}: HeaderProps) {
  return (
    <View style={[styles.header, viewStyle]}>
      <Text style={[styles.title, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    paddingHorizontal: 28,
  },
  title: {
    ...TYPOGRAPHY.DT3,
    color: COLOR['GC-950'],
  },
});
