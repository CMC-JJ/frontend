import {COLOR, TYPOGRAPHY} from '@/constants';
import React, {forwardRef, Ref, useCallback, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
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
      isCharacterExisted = false,
      style,
      isValid = true,
      secureTextEntry,
      ...rest
    }: BottomBorderedInputProps,
    ref: Ref<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const animation = useRef(new Animated.Value(0)).current;
    const isPasswordInput = secureTextEntry;
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
        if (!isCharacterExisted) {
          Animated.timing(animation, {
            toValue,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
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
            style,
            hasMarginBottom && styles.margin,
            isCharacterExisted && isFocused && styles.focused,
            !isValid && styles.warning,
          ]}
          secureTextEntry={isPasswordShown === true ? false : isPasswordInput}
          {...rest}
          onBlur={() => {
            setIsFocused(false);
            handleLabelAnimation(0);
          }}
          onFocus={() => {
            setIsFocused(true);
            handleLabelAnimation(1);
          }}
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
