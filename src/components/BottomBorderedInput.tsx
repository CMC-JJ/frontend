import {COLOR, TYPOGRAPHY} from '@/constants';
import React, {forwardRef, Ref, useCallback, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

type BottomBorderedInputProps = TextInputProps & {
  label: string;
  isCharacterExisted: boolean;
  hasMarginBottom?: boolean;
  isValid?: boolean;
  style?: TextInputProps['style'];
};

export const BottomBorderedInput = forwardRef<
  TextInput,
  BottomBorderedInputProps
>(
  (
    {
      label,
      hasMarginBottom,
      secureTextEntry,
      isCharacterExisted = false,
      isValid = true,
      style,
      ...rest
    }: BottomBorderedInputProps,
    ref: Ref<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const animation = useRef(new Animated.Value(0)).current;
    const isPasswordInput = Boolean(secureTextEntry);
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

    const labelStyle = {
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30],
          }),
        },
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -5],
          }),
        },
        {
          scale: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8],
          }),
        },
      ],
    };

    const handleLabelAnimation = useCallback(
      (toValue: number) => {
        if (isCharacterExisted) {
          return;
        }

        Animated.timing(animation, {
          toValue,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },

      [animation, isCharacterExisted],
    );

    return (
      <View style={styles.input_container}>
        <Animated.Text
          style={[
            styles.label,
            labelStyle,
            (isFocused || isCharacterExisted) && styles.focusedLabel,
          ]}>
          {label}
        </Animated.Text>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            hasMarginBottom && styles.margin,
            // 인풋에 글자가 존재하고 포커스 되어있을 때만 스타일 적용
            isCharacterExisted && isFocused && styles.focused,
            // iOS에서 password input에서 secureText로 보일 때, 커서와 align이 맞도록 font size를 조정
            Platform.OS === 'ios' &&
              isPasswordInput &&
              !isPasswordShown &&
              styles.secure_input,
            !isValid && styles.warning,
            style,
          ]}
          // 인풋의 눈모양을 누르면 보이게하고 다른 경우는 password input인 경우 secureTextEntry 속성 적용
          secureTextEntry={isPasswordShown ? false : isPasswordInput}
          {...rest}
          onBlur={() => {
            setIsFocused(false);
            handleLabelAnimation(0);
          }}
          onFocus={() => {
            setIsFocused(true);
            handleLabelAnimation(1);
          }}
          // 안드로이드 커서에 Primary Color 색상 적용
          cursorColor={COLOR.PC}
        />
        {isPasswordInput && (
          <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
            <Image
              source={
                isPasswordShown
                  ? require('@/assets/images/eye-fill.png')
                  : require('@/assets/images/eye-off.png')
              }
              style={styles.image}
            />
          </Pressable>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input_container: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: 5,
    color: COLOR['GC-800'],
    ...TYPOGRAPHY.TT2,
  },
  focusedLabel: {
    color: COLOR['GC-700'],
  },
  input: {
    height: 40,
    paddingBottom: 10,
    paddingLeft: -5,
    borderColor: COLOR['GC-950'],
    borderBottomWidth: 1,
    color: COLOR['GC-950'],
    ...TYPOGRAPHY.BT1,
  },
  secure_input: {
    fontSize: 19,
  },
  margin: {
    marginBottom: 50,
  },
  focused: {
    borderColor: COLOR.PC,
  },
  warning: {
    borderColor: COLOR.EC,
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: 7,
    width: 30,
    height: 28,
  },
});
