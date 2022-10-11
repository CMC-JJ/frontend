import React, {forwardRef, Ref, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

// 사용자 정의 prop
type ExtraInputProps = {
  isTextExisted: boolean;
  hasMarginBottom?: boolean;
  clearButtonHandler: () => void;
};

// 기존 TextInputProps와 사용자 정의 prop을 합친 타입
type BottomBorderedInputProps = TextInputProps & ExtraInputProps;

export const BottomBorderedInput = forwardRef<
  TextInput,
  BottomBorderedInputProps
>(
  (
    {
      isTextExisted,
      hasMarginBottom,
      clearButtonHandler,
      ...rest
    }: BottomBorderedInputProps,
    ref: Ref<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      <>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            hasMarginBottom && styles.margin,
            isFocused && styles.focused,
          ]}
          {...rest}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
        <Icon
          onPress={clearButtonHandler}
          name="x-circle-fill"
          size={18}
          color="##7C7C7C"
          style={[styles.xIcon, isTextExisted && styles.xIconVisible]}
        />
      </>
    );
  },
);

const styles = StyleSheet.create({
  input: {
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
  xIcon: {
    opacity: 0,
    position: 'relative',
    top: -77,
    right: -310,
  },
  xIconVisible: {
    opacity: 1,
  },
});

// 그 외 UI 구성
