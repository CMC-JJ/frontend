import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomBorderedInput} from '.';
import {request} from '../utils';

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

  const [isIdValid, setIsIdValid] = useState<boolean>(false);
  const [isDuplicatedCheckCompleted, setIsDuplicatedCheckCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    if (form.userName.length >= 1 && form.userName.length <= 15) {
      setIsIdValid(true);
    } else {
      setIsIdValid(false);
    }

    setIsDuplicatedCheckCompleted(false);
  }, [form.userName.length]);

  const onPressDuplicateId = async () => {
    const result = await request(
      'web/auth/duplicate-id',
      {userName: form.userName},
      'GET',
    );

    if (!result.isSuccess) {
      Alert.alert('이미 존재하는 아이디입니다.');
    } else {
      setIsDuplicatedCheckCompleted(true);
      Alert.alert('사용 가능한 아이디입니다.');
    }
  };

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
    const isValidPassword = passwordRegex.test(form.password);

    if (isValidPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [form.password]);

  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      form.password === form.confirmPassword &&
      form.confirmPassword.length > 0
    ) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  }, [form.confirmPassword, form.password]);

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
    marginBottom: 50,
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
  confirmPasswordContainer: {},
});
