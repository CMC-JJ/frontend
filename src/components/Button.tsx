import {COLOR, TYPOGRAPHY} from '@/constants';
import React from 'react';
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

type ButtonProps = PressableProps & {
  text: string;
  textStyle?: TextStyle;
  isValid?: boolean;
  design?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export const Button = ({
  text,
  textStyle,
  isValid = true,
  design = 'primary',
  style,
  ...rest
}: ButtonProps) => {
  const validButtonStyle = isValid && styles.validButton;
  const validButtonText = isValid && styles.validButtonText;

  const isSecondaryButton = design === 'secondary';

  const secondaryButtonStyle = isSecondaryButton && styles.secondaryButton;
  const secondaryButtonText = isSecondaryButton && styles.secondaryButtonText;

  return (
    <Pressable
      disabled={!isValid}
      style={[styles.button, validButtonStyle, secondaryButtonStyle, style]}
      {...rest}>
      <Text
        style={[
          styles.buttonText,
          validButtonText,
          secondaryButtonText,
          textStyle,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLOR['GC-300'],
  },
  validButton: {
    backgroundColor: COLOR.PC,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLOR.PC,
    backgroundColor: COLOR['GC-50'],
  },
  buttonText: {
    color: COLOR['GC-600'],
    ...TYPOGRAPHY.TT3,
  },
  validButtonText: {
    color: COLOR['GC-50'],
  },
  secondaryButtonText: {
    color: COLOR.PC,
  },
});
