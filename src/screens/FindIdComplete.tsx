import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ArrowBack, SignButton} from '../components';
import {useSignUpStore} from '../store';
import {RootStackNavigationProp, RootStackParamList} from './RootStack';

type FindIdCompleteRouteProp = RouteProp<RootStackParamList, 'FindIdComplete'>;

export function FindIdComplete() {
  const {params} = useRoute<FindIdCompleteRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {setSignUpForm} = useSignUpStore();

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>가입된 아이디를 찾았습니다.</Text>
        <Text style={styles.message}>아이디 확인 후 로그인 해주세요</Text>
        <View style={styles.division} />
        <View style={styles.idContainer}>
          <Text style={styles.userName}>{params.userName}</Text>
          <Text style={styles.createdAt}>가입일 {params.createdAt}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid
          buttonText="비밀번호 찾기"
          onPress={() => {
            setSignUpForm('userName', params.userName);
            navigation.navigate('FindPassword');
          }}
          isbackgroundWhite
        />
        <SignButton
          isValid
          buttonText="로그인"
          onPress={() => {
            navigation.navigate('SignIn');
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
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 20,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 34,
    color: 'black',
  },
  message: {
    marginTop: 8,

    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 23,
    color: '#464646',
  },
  idInfo: {
    flex: 1,

    paddingHorizontal: 25,
  },
  division: {
    marginTop: 33,

    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  idContainer: {
    marginTop: 30,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 23,
    color: '#121212',
  },
  createdAt: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: '#898A8D',
  },
  findPassword: {
    backgroundColor: 'white',
  },
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 34,
  },
});
