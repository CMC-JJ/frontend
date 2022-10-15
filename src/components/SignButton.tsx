import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type ConditionalButtonProps = {
  isValid: boolean;
  buttonText: string;
  onPress?: () => void;
};

export function SignButton({
  isValid,
  buttonText,
  onPress,
}: ConditionalButtonProps) {
  return (
    <TouchableOpacity disabled={!isValid} onPress={onPress}>
      <View style={[styles.button, isValid && styles.validButton]}>
        <Text style={[styles.buttonText, isValid && styles.validButtonText]}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 325,
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
  validButtonText: {
    color: 'white',
  },
});
