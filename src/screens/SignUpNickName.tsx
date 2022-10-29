import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ArrowBack,
  BottomBorderedInput,
  FormHeader,
  SignButton,
} from '../components';
import {useSignUpStore} from '../store';
import {RootStackNavigationProp} from './RootStack';

export function SignUpNickName() {
  const {setSignUpForm} = useSignUpStore();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [nickName, setNickName] = useState<string>('');
  const [isNickNameValid, setIsNickNameValid] = useState<boolean>(false);

  useEffect(() => {
    if (nickName.length < 2) {
      setIsNickNameValid(false);
    } else {
      setIsNickNameValid(true);
    }
  }, [nickName.length]);

  const onPress = () => {
    Keyboard.dismiss();

    setSignUpForm('nickName', nickName);
    navigation.navigate('SignUpComplete');
  };
  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <FormHeader text={'회원가입을 위한 아이디와\n비밀번호를 입력해주세요.'} />
      <View style={styles.form}>
        <BottomBorderedInput
          isCharacterExisted={nickName.length > 0}
          value={nickName}
          onChangeText={setNickName}
          placeholder="닉네임(한글 2자 이상)"
          autoCapitalize="none"
          autoCorrect={false}
          isValid={nickName.length > 0 ? isNickNameValid : true}
        />
        {isNickNameValid ? (
          <Text style={styles.validNickName}>사용 가능한 닉네임 입니다.</Text>
        ) : (
          nickName.length > 0 && (
            <Text style={styles.warning}>닉네임 최소 2자 입력</Text>
          )
        )}
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid={isNickNameValid}
          buttonText="다음"
          onPress={onPress}
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
  validNickName: {
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
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
    paddingHorizontal: 25,
  },
});
