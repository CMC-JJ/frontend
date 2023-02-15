import {COLOR, TYPOGRAPHY} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';

type HeaderTitleProps = {
  text: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export function HeaderTitle({text, viewStyle, textStyle}: HeaderTitleProps) {
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
