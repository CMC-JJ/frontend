import React, {useEffect, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomBorderedInput} from '.';
import {useIdCheck, usePasswordCheck} from '../hooks';

type Form = {
  userName: string;
  password: string;
  confirmPassword: string;
};

type SignUpFormProps = {
  form: Form;
  createChangeTextHandler: (key: string) => (value: string) => void;
  setIsAllValid: (value: boolean) => void;
};

export function SignUpForm({
  form,
  createChangeTextHandler,
  setIsAllValid,
}: SignUpFormProps) {
  const confirmPasswordRef = useRef<TextInput>(null);

  const {isIdValid, isDuplicatedCheckCompleted, onPressDuplicateId} =
    useIdCheck(form.userName);

  const {isPasswordValid, isConfirmPasswordValid} = usePasswordCheck(
    form.password,
    form.confirmPassword,
  );

  useEffect(() => {
    if (
      isIdValid &&
      isDuplicatedCheckCompleted &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
  }, [
    isConfirmPasswordValid,
    isDuplicatedCheckCompleted,
    isIdValid,
    isPasswordValid,
    setIsAllValid,
  ]);

  return (
    <>
      <View style={styles.duplicateIdContainer}>
        <BottomBorderedInput
          hasMarginBottom
          isCharacterExisted={form.userName.length > 0}
          value={form.userName}
          onChangeText={createChangeTextHandler('userName')}
          placeholder="아이디"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.duplicateId}
        />
        <TouchableOpacity
          onPress={onPressDuplicateId}
          disabled={!isIdValid}
          style={[
            styles.buttonContainer,
            Platform.OS === 'android' && {marginTop: 10},
          ]}>
          <View style={[styles.button, isIdValid && styles.validButton]}>
            <Text
              style={[styles.buttonText, isIdValid && styles.validButtonText]}>
              중복확인
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <BottomBorderedInput
          isCharacterExisted={form.password.length > 0}
          placeholder="비밀번호"
          value={form.password}
          isValid={form.password.length > 0 ? isPasswordValid : true}
          onChangeText={createChangeTextHandler('password')}
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        {isPasswordValid ? (
          <Text style={styles.validPassword}>사용 가능한 비밀번호 입니다.</Text>
        ) : (
          form.password.length > 0 && (
            <Text style={styles.warning}>영문,숫자 포함 6~20 자리</Text>
          )
        )}
      </View>
      <View style={styles.confirmPasswordContainer}>
        <BottomBorderedInput
          isCharacterExisted={form.confirmPassword.length > 0}
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          isValid={
            form.confirmPassword.length > 0 ? isConfirmPasswordValid : true
          }
          secureTextEntry
          returnKeyType="done"
          ref={confirmPasswordRef}
        />
        {isConfirmPasswordValid ? (
          <Text style={styles.validPassword}>동일한 비밀번호입니다.</Text>
        ) : (
          form.confirmPassword.length > 0 && (
            <Text style={styles.warning}>비밀번호를 확인해주세요.</Text>
          )
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  duplicateIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duplicateId: {
    flex: 0.65,
  },
  buttonContainer: {
    flex: 0.3,
  },
  button: {
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
    borderRadius: 8,

    height: 40,

    alignItems: 'center',
    justifyContent: 'center',
  },
  validButton: {
    backgroundColor: '#0066FF',
  },
  buttonText: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
  },
  validButtonText: {
    color: '#FFFFFF',
  },
  passwordContainer: {
    height: 90,
  },
  validPassword: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 34,
    color: '#0066FF',

    textAlign: 'right',
  },
  warning: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 34,
    color: '#FF0000',

    textAlign: 'right',
  },
});
