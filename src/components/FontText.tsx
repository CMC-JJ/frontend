import {Platform, StyleSheet, Text} from 'react-native';
import React, {ComponentProps} from 'react';

export function FontText({style, ...rest}: ComponentProps<typeof Text>) {
  const androidStyle = {
    fontFamily: 'Pretendard-Medium',
  };

  if (style && style.fontWeight) {
    switch (style.fontWeight) {
      case '700':
        androidStyle.fontFamily = 'Pretendard-ExtraBold';
        break;
      case '600':
        androidStyle.fontFamily = 'Pretendard-Bold';
        break;
      case '500':
        androidStyle.fontFamily = 'Pretendard-SemiBold';
        break;
      case '400':
        androidStyle.fontFamily = 'Pretendard-Medium';
        break;
      case '300':
        androidStyle.fontFamily = 'Pretendard-Regular';
        break;
    }
  }

  return (
    <Text
      style={[styles.font, style, Platform.OS === 'android' && androidStyle]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Pretendard',
    color: 'black',
  },
});

// Platform.OS === 'android' &&
