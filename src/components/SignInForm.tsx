import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import {BottomBorderedInput} from '@/components';

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
        isCharacterExisted={form.userName.length > 0}
        onChangeText={createChangeTextHandler('userName')}
        placeholder="아이디"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <BottomBorderedInput
        isCharacterExisted={form.password.length > 0}
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
