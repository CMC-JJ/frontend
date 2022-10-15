import React, {forwardRef, Ref, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

// 사용자 정의 prop
type ExtraInputProps = {
  hasMarginBottom?: boolean;
  style?: TextInputProps['style'];
};

// 기존 TextInputProps와 사용자 정의 prop을 합친 타입
type BottomBorderedInputProps = TextInputProps & ExtraInputProps;

export const BottomBorderedInput = forwardRef<
  TextInput,
  BottomBorderedInputProps
>(
  (
    {hasMarginBottom, style, ...rest}: BottomBorderedInputProps,
    ref: Ref<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      <TextInput
        ref={ref}
        style={[
          style,
          styles.input,
          hasMarginBottom && styles.margin,
          isFocused && styles.focused,
        ]}
        {...rest}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,
    color: 'black',

    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 20,

    paddingBottom: 10,
    paddingLeft: -5,
  },
  focused: {
    borderColor: '#0066FF',
  },
  margin: {
    marginBottom: 50,
  },
});
