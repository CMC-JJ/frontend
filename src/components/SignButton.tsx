import React, {ComponentProps} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ConditionalButtonProps
  extends ComponentProps<typeof TouchableOpacity> {
  isValid: boolean;
  buttonText: string;
  onPress?: () => void;
  isbackgroundWhite?: boolean;
}

export function SignButton({
  isValid,
  buttonText,
  onPress,
  isbackgroundWhite = false,
  style,
  ...rest
}: ConditionalButtonProps) {
  return (
    <TouchableOpacity
      disabled={!isValid}
      onPress={onPress}
      style={[styles.touchable, style]}
      {...rest}>
      <View
        style={[
          styles.button,
          isValid && styles.validButton,
          isbackgroundWhite && styles.backgroundWhite,
        ]}>
        <Text
          style={[
            styles.buttonText,
            isValid && styles.validButtonText,
            isbackgroundWhite && styles.colorBlue,
          ]}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  button: {
    height: 56,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: '#909397',
  },
  validButton: {
    backgroundColor: '#0066FF',
  },
  backgroundWhite: {
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#0066FF',
    backgroundColor: 'white',
  },
  colorBlue: {
    color: '#0066FF',
  },
  validButtonText: {
    color: 'white',
  },
});
