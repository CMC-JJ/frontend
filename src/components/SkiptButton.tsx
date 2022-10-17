import React from 'react';

import TextButton from './TextButton';
import {BUTTON_SIZE, getDefaultStyle} from '../constants/skipButton';
import {Dimensions, StyleSheet, View} from 'react-native';

const SkipButton = ({skipLabel, isLight, ...rest}: any) => (
  <View style={styles.container}>
    <TextButton
      size={BUTTON_SIZE}
      style={styles.skipButton}
      textStyle={getDefaultStyle(isLight)}
      {...rest}>
      {skipLabel}
    </TextButton>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,

    marginBottom: 100,
    alignItems: 'center',
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: '40%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
export default SkipButton;
