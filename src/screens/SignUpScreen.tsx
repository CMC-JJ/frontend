import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {ArrowBack, FormHeader, SignButton, SignUpForm} from '../components';
import {useSignUpStore} from '../store';
import {RootStackNavigationProp} from './RootStack';

export function SignUpScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {setSignUpForm} = useSignUpStore();
  const [form, setForm] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  const onPress = () => {
    Keyboard.dismiss();

    setSignUpForm('userName', form.userName);
    setSignUpForm('password', form.password);

    navigation.navigate('NickName');
  };

  const [isAllValid, setIsAllValid] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <FormHeader text={'회원가입을 위한 아이디와\n비밀번호를 입력해주세요.'} />
      <View style={styles.form}>
        <SignUpForm
          form={form}
          createChangeTextHandler={createChangeTextHandler}
          setIsAllValid={setIsAllValid}
        />
      </View>
      <View style={styles.footer}>
        <SignButton isValid={isAllValid} buttonText="다음" onPress={onPress} />
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
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
    paddingHorizontal: 25,
  },
});
