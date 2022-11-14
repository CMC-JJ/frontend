import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack} from '@/components';
import {FontText} from '@/components/FontText';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ThickBar} from '@/components/BarSeparator';
import TextRightIcon from '@/components/TextRightIcon';
import {InfoDetailCompleteRouteProp} from './MyPageScreen';
import {initialState, useAuthStore} from '@/store';
import {useHideTabBar} from '@/hooks/useVisibleTabBar';
import {MypageNavigationProp} from '@/screens';

export function InfoDetailScreen() {
  const {params} = useRoute<InfoDetailCompleteRouteProp>();
  const navigation = useNavigation<MypageNavigationProp>();
  const {setAuth} = useAuthStore();
  const onLogout = () => {
    Alert.alert('로그아웃 하시겠습니까?', '', [
      {
        text: '네',
        onPress: () => {
          setAuth(initialState);
          navigation.navigate('Start');
        },
      },
      {
        text: '아니요',
      },
    ]);
  };
  useFocusEffect(useHideTabBar(navigation));
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <View style={styles.back}>
          {Platform.OS === 'ios' && <ArrowBack size={28} />}
        </View>
        <View>
          <FontText style={styles.headerTitle}>내 정보</FontText>
        </View>
      </View>
      <View style={styles.userImg}>
        <Image source={require('@/assets/images/userImg.png')} />
        <View style={styles.textContainer}>
          <FontText style={styles.nickName}>{params.auth.nickName}</FontText>
          <FontText style={styles.userName}>{params.auth.userName}</FontText>
        </View>
      </View>
      <ThickBar />
      <TextRightIcon
        text={'내 정보 수정하기'}
        onPress={() => {
          navigation.navigate('InfoModify', {
            auth: params.auth,
          });
        }}
        isBar
      />
      <TextRightIcon
        text={'비밀번호 변경'}
        onPress={() => {
          navigation.navigate('ModifyPassword', {
            auth: params.auth,
          });
        }}
      />
      <ThickBar />
      <TextRightIcon
        text={'로그아웃'}
        onPress={() => {
          onLogout();
        }}
        isIcon={false}
        isBar
      />
      <TouchableHighlight
        style={styles.deleteButton}
        underlayColor="white"
        onPress={() => {
          navigation.navigate('Delete', {auth: params.auth});
        }}>
        <FontText style={styles.delete}>회원탈퇴</FontText>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 5,
    paddingTop: 5,
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  userImg: {
    marginTop: 46,
    alignItems: 'center',
  },
  textContainer: {marginTop: 28, alignItems: 'center', marginBottom: 30},
  nickName: {fontSize: 18, fontWeight: '600', marginBottom: 11},
  userName: {fontSize: 15, fontWeight: '500', color: '#979797'},
  delete: {
    textDecorationLine: 'underline',
    fontSize: 13,
    fontWeight: '400',
    color: '#7C7C7C',
  },
  deleteButton: {
    marginLeft: 25,
    marginTop: 20,
    width: 50,
  },
});
