import {StyleSheet, Text} from 'react-native';
import React, {ComponentProps} from 'react';

export default function FontText({
  style,
  ...rest
}: ComponentProps<typeof Text>) {
  return <Text style={[styles.font, style]} {...rest} />;
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Pretendard',
    color: 'black',
  },
});
