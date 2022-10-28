import React from 'react';

import {BUTTON_SIZE, getDefaultStyle} from '../constants/skipButton';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SkipButton = ({isLight, ...rest}: any) => (
  <View style={styles.container}>
    <TouchableOpacity
      activeOpacity={0.8}
      // title={'done'}
      style={styles.skipButton}
      {...rest}>
      <Text style={[getDefaultStyle(isLight), textStyle.text]}>시작하기</Text>
    </TouchableOpacity>
  </View>
);
const textStyle = StyleSheet.create({
  text: {
    fontSize: BUTTON_SIZE / 2.5,
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
    marginBottom: 30,
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    zIndex: 0,
  },
});
export default SkipButton;
