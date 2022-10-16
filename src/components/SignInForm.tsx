import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import {BottomBorderedInput} from './';

type Form = {
  userName: string;
  password: string;
};

type SignInFormProps = {
  form: Form;
  createChangeTextHandler: (key: string) => (value: string) => void;
};

export function SignInForm({form, createChangeTextHandler}: SignInFormProps) {
  const passwordRef = useRef<TextInput>(null);

  return (
    <>
      <BottomBorderedInput
        hasMarginBottom
        value={form.userName}
        onChangeText={createChangeTextHandler('userName')}
        placeholder="아이디"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <BottomBorderedInput
        placeholder="비밀번호"
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        returnKeyType="done"
        ref={passwordRef}
      />
    </>
  );
}
