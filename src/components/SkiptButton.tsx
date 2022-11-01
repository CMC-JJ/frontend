import React from 'react';

import {getDefaultStyle} from '../constants/skipButton';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DoneButtonProps, SkipButtonProps} from 'react-native-onboarding-swiper';

const SkipButton = ({isLight, ...rest}: SkipButtonProps | DoneButtonProps) => (
  <View style={styles.container}>
    <TouchableOpacity activeOpacity={0.8} style={styles.skipButton} {...rest}>
      <Text style={[getDefaultStyle(isLight), textStyle.text]}>시작하기</Text>
    </TouchableOpacity>
  </View>
);
const textStyle = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: Dimensions.get('window').width,
    marginBottom: 100,
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 153,
    height: 56,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});
export default SkipButton;
