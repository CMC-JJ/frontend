import {Alert, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MypageNavigationProp, MypageStackParamList} from './MyPageStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontText from '@/components/FontText';
import {ArrowBack, SignButton, TabHeader} from '@/components';
import IconOct from 'react-native-vector-icons/Octicons';
import {accountDelete} from '@/utils/fetchMypage';
export type DeleteConfirmCompleteRouteProp = RouteProp<
  MypageStackParamList,
  'DeleteConfirm'
>;
export default function DeleteConfirmScreen() {
  const list = [
    '회원님의 모든 정보는 삭제됩니다.',
    '서비스 이용 후기 등 일부 정보는 계속 남아있을 수 있습니다.',
    '7일 동안 재가입할 수 없습니다.',
    '현재 계정으로 다시 로그인할 수 없습니다.',
  ];
  const {params} = useRoute<DeleteConfirmCompleteRouteProp>();
  const navigation = useNavigation<MypageNavigationProp>();

  const onDelete = () => {
    Alert.alert('계정을 삭제하시겠습니까?', '', [
      {
        text: '네',
        onPress: () => {
          accountDelete(params.userId, params.deleteId),
            navigation.navigate('Start');
        },
      },
      {
        text: '아니요',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>

      <TabHeader text={'회원탈퇴'} />

      <View style={styles.textForm}>
        <FontText style={styles.title}>
          {'잠깐만요! 삭제하기 전에 확인해주세요.\n계정 삭제 후에는'}
        </FontText>
        <View style={styles.listContainer}>
          {list.map((elem, i) => (
            <View style={styles.dotContainer} key={i}>
              <IconOct
                style={styles.dot}
                size={10}
                color="gray"
                name="dot-fill"
              />
              <FontText style={styles.listText}>{elem}</FontText>
            </View>
          ))}
        </View>
        <View>
          <FontText style={styles.subTitle}>
            {
              '아래의 계정 삭제 버튼을 누르면 줄리님의 모든\n정보와 활동이 영구히 삭제되며,'
            }
          </FontText>
          <FontText style={styles.subTitle2}>
            7일 동안 다시 가입할 수 없어요.
          </FontText>
          <FontText style={styles.title}>그래도 삭제하시겠습니까?</FontText>
        </View>
      </View>

      <View style={styles.button}>
        <SignButton buttonText="계정 삭제" isValid onPress={() => onDelete()} />
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#464646',
    marginTop: 38,
  },
  textForm: {
    paddingHorizontal: 25,
    width: '100%',
  },
  text: {},
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    marginRight: 7,
  },
  listContainer: {
    marginTop: 12,
  },
  listText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#464646',
    lineHeight: 23,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#464646',
    lineHeight: 23,
    marginTop: 14,
  },
  subTitle2: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0066FF',
    lineHeight: 23,
  },
  button: {
    position: 'absolute',
    bottom: 110,
    flexDirection: 'row',
    paddingHorizontal: 25,
  },
});
