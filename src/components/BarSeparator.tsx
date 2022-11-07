import {StyleSheet, View} from 'react-native';
import React, {ComponentProps} from 'react';

export function ThickBar({style}: {style?: ComponentProps<typeof View>}) {
  return <View style={[styles.thickBar, style]} />;
}
export function ThinBar({style}: {style?: ComponentProps<typeof View>}) {
  return <View style={[styles.thinBar, style]} />;
}
const styles = StyleSheet.create({
  thinBar: {borderWidth: 0.5, borderColor: '#DEDEDE'},
  thickBar: {
    backgroundColor: '#DEDEDE',
    opacity: 0.5,
    height: 10,
  },
});
