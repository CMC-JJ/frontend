import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ArrowBack,
  BottomBorderedInput,
  FormHeader,
  SignButton,
} from '@/components';
import {usePasswordCheck} from '@/hooks';
import {request} from '@/utils';
import type {RootStackNavigationProp, RootStackParamList} from '@/screens';

type FindPasswordCompleteRouteProp = RouteProp<
  RootStackParamList,
  'FindPasswordComplete'
>;

export function FindPasswordComplete() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {params} = useRoute<FindPasswordCompleteRouteProp>();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const confirmPasswordRef = useRef<TextInput>(null);

  const [isAllValid, setIsAllValid] = useState<boolean>(false);

  const {isPasswordValid, isConfirmPasswordValid} = usePasswordCheck(
    form.password,
    form.confirmPassword,
  );

  useEffect(() => {
    if (isPasswordValid && isConfirmPasswordValid) {
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
  }, [isConfirmPasswordValid, isPasswordValid, setIsAllValid]);

  const onPressNext = async () => {
    Keyboard.dismiss();

    const result = await request(
      'web/auth/password',
      {
        userId: params.userId,
        password: form.password,
      },
      'PATCH',
    );

    if (result.isSuccess) {
      Alert.alert('비밀번호 변경에 성공하였습니다.');
      navigation.navigate('SignIn');
    } else {
      Alert.alert(result.message);
    }
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <FormHeader text={'새로운 비밀번호를\n입력해 주세요.'} />
      <View style={styles.form}>
        <View style={styles.passwordContainer}>
          <BottomBorderedInput
            isCharacterExisted={form.password.length > 0}
            placeholder="비밀번호"
            value={form.password}
            isValid={form.password.length > 0 ? isPasswordValid : true}
            onChangeText={text => setForm({...form, password: text})}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          />
          {isPasswordValid ? (
            <Text style={styles.validPassword}>
              사용 가능한 비밀번호 입니다.
            </Text>
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
            onChangeText={text => setForm({...form, confirmPassword: text})}
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
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid={isAllValid}
          buttonText="다음"
          onPress={onPressNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  form: {
    flex: 1,
    padding: 25,
    paddingTop: 0,
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
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
    paddingHorizontal: 25,
  },
});
