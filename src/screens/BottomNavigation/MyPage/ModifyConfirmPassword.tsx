import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  ArrowBack,
  BottomBorderedInput,
  SignButton,
  TabHeader,
} from '@/components';
import FontText from '@/components/FontText';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MypageNavigationProp, MypageStackParamList} from './MyPageStack';
import {usePasswordChangeCheck} from '@/hooks/usePasswordChangeCheck';
import {changePassword} from '@/utils/fetchMypage';
import {initialState, useAuthStore} from '@/store/useAuthStore';
type ConfirmPasswordCompleteRouteProp = RouteProp<
  MypageStackParamList,
  'ModifyConfirmPassword'
>;
export function ModifyConfirmPassword() {
  const {params} = useRoute<ConfirmPasswordCompleteRouteProp>();
  const [newPwd, setNewPwd] = useState({
    password: '',
    confirmPassword: '',
  });
  const navigation = useNavigation<MypageNavigationProp>();
  const {isPasswordValid, isConfirmPasswordValid} = usePasswordChangeCheck(
    newPwd.password,
    newPwd.confirmPassword,
  );
  const createChangeTextHandler = (name: string) => (value: string) => {
    setNewPwd({...newPwd, [name]: value});
  };
  const confirmPasswordRef = useRef<TextInput>(null);
  const {setAuth} = useAuthStore();
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <TabHeader text={'새로운 비밀번호를\n입력해주세요.'} />
      <View style={styles.passwordForm}>
        <View style={styles.passwordContainer}>
          <BottomBorderedInput
            isCharacterExisted={newPwd.password.length > 0}
            placeholder="새로운 비밀번호 (영문,숫자 6~20자리)"
            value={newPwd.password}
            isValid={newPwd.password.length > 0 ? isPasswordValid : true}
            onChangeText={createChangeTextHandler('password')}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          />
          {isPasswordValid ? (
            <FontText style={styles.validPassword}>
              사용 가능한 비밀번호 입니다.
            </FontText>
          ) : (
            newPwd.password.length > 0 && (
              <FontText style={styles.warning}>
                영문,숫자 포함 6~20 자리
              </FontText>
            )
          )}
        </View>
        <View style={styles.confirmPasswordContainer}>
          <BottomBorderedInput
            isCharacterExisted={newPwd.confirmPassword.length > 0}
            placeholder="새로운 비밀번호 재확인"
            value={newPwd.confirmPassword}
            onChangeText={createChangeTextHandler('confirmPassword')}
            isValid={
              newPwd.confirmPassword.length > 0 ? isConfirmPasswordValid : true
            }
            secureTextEntry
            returnKeyType="done"
            ref={confirmPasswordRef}
          />
          {isConfirmPasswordValid ? (
            <FontText style={styles.validPassword}>
              동일한 비밀번호입니다.
            </FontText>
          ) : (
            newPwd.confirmPassword.length > 0 && (
              <FontText style={styles.warning}>
                비밀번호를 확인해주세요.
              </FontText>
            )
          )}
        </View>
      </View>
      <View style={[styles.button, Platform.OS === 'android' && {bottom: 80}]}>
        <SignButton
          buttonText={'확인'}
          isValid={isPasswordValid && isConfirmPasswordValid ? true : false}
          onPress={() => {
            changePassword(params.auth.userId, newPwd.confirmPassword).then(
              res =>
                res
                  ? (navigation.navigate('Start'), setAuth(initialState))
                  : Alert.alert(
                      '기존의 비밀번호와 같은 비밀번호는 사용할 수 없습니다.',
                    ),
            );
          }}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
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
  confirmPasswordContainer: {},
  passwordForm: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 54,
  },
  button: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    paddingHorizontal: 25,
  },
});
