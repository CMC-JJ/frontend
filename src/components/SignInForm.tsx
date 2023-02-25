import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import {BottomBorderedInput} from '@/components';

type SignInForm = {
  userName: string;
  password: string;
};

type SignInFormProps = {
  form: SignInForm;
  createChangeTextHandler: (key: string) => (value: string) => void;
};

const isCharacterExisted = (value: string) => value.length > 0;

export function SignInForm({form, createChangeTextHandler}: SignInFormProps) {
  const passwordRef = useRef<TextInput>(null);

  return (
    <>
      <BottomBorderedInput
        hasMarginBottom
        value={form.userName}
        isCharacterExisted={isCharacterExisted(form.userName)}
        onChangeText={createChangeTextHandler('userName')}
        label="아이디"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <BottomBorderedInput
        isCharacterExisted={isCharacterExisted(form.password)}
        label="비밀번호"
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        returnKeyType="done"
        ref={passwordRef}
      />
    </>
  );
}
