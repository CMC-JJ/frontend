import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {BottomBorderedInput} from './';

export function SignInForm() {
  const passwordRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  const isTextExisted = (value: string) => value.length > 0;

  const clearButtonHandler = (name: string) => () => {
    setForm({...form, [name]: ''});
  };

  // 로그인 정보 서버로 보내는 로직 구현 필요

  return (
    <>
      <BottomBorderedInput
        hasMarginBottom
        isTextExisted={isTextExisted(form.username)}
        clearButtonHandler={clearButtonHandler('username')}
        value={form.username}
        onChangeText={createChangeTextHandler('username')}
        placeholder="아이디"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <BottomBorderedInput
        isTextExisted={isTextExisted(form.password)}
        clearButtonHandler={clearButtonHandler('password')}
        placeholder="비밀번호"
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        returnKeyType="done"
        ref={passwordRef}
        // onSubmitEditing={() => {
        //     if (isSignUp) {
        //       confirmPasswordRef.current.focus();
        //     } else {
        //       onSubmit();
        //     }
        //   }}
      />
    </>
  );
}
