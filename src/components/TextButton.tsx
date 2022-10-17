import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
// import PropTypes from 'prop-types';

const TextButton = ({
  size,
  onPress,
  textStyle,
  allowFontScaling,
  style,
  children,
}: any) => (
  <View style={{...style}}>
    {/* style={{flex: 0, paddingHorizontal: 10, ...style}} */}
    <TouchableOpacity
      // style={{flex: 0}}
      onPress={onPress}
      hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
      <Text
        allowFontScaling={allowFontScaling}
        style={{fontSize: size / 2.5, ...textStyle}}>
        {children}
      </Text>
    </TouchableOpacity>
  </View>
);

TextButton.defaultProps = {
  textStyle: null,
  allowFontScaling: true,
};

export default TextButton;
