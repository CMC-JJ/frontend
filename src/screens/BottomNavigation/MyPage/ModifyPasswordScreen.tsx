import {Alert, Platform, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowBack,
  BottomBorderedInput,
  SignButton,
  TabHeader,
} from '@/components';
import {FontText} from '@/components/FontText';
import {validationPassword} from '@/utils/fetchMypage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {InfoDetailCompleteRouteProp} from './MyPageScreen';
import {MypageNavigationProp} from './MyPageStack';
import {useHideTabBar} from '@/hooks/useVisibleTabBar';

export function ModifyPasswordScreen() {
  const [password, setPassword] = useState('');
  const navigation = useNavigation<MypageNavigationProp>();
  const {params} = useRoute<InfoDetailCompleteRouteProp>();
  const passwordRef = useRef<TextInput>(null);
  useFocusEffect(useHideTabBar(navigation));
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <TabHeader text={'비밀번호 변경'} />
      <View style={styles.form}>
        <FontText style={styles.title}>현재 비밀번호</FontText>
        <BottomBorderedInput
          isCharacterExisted={false}
          label="현재 비밀번호를 입력해주세요."
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry
          returnKeyType="done"
          ref={passwordRef}
        />
      </View>
      <View style={[styles.button, Platform.OS === 'android' && {bottom: 80}]}>
        <SignButton
          buttonText={'다음'}
          isValid={password ? true : false}
          onPress={() => {
            validationPassword(password).then(result =>
              result
                ? navigation.navigate('ModifyConfirmPassword', {
                    auth: params.auth,
                  })
                : Alert.alert('비밀번호가 틀렸습니다.'),
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
  form: {
    paddingHorizontal: 25,
    marginTop: 54,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7C7C7C',
    marginBottom: 9,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'black',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 20,
    paddingBottom: 10,
    paddingLeft: -5,
  },
  button: {
    position: 'absolute',
    bottom: 34,
    flexDirection: 'row',
    paddingHorizontal: 25,
    flex: 1,
  },
});
