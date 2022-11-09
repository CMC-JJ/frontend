import {TabHeader} from '@/components';
import {ThickBar} from '@/components/BarSeparator';
import FontText from '@/components/FontText';
import TextRightIcon from '@/components/TextRightIcon';
import {MypageNavigationProp, MypageStackParamList} from '@/screens';
import {useAuthStore} from '@/store';
import {RouteProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
// import IconOct from 'react-native-vector-icons/Octicons';
export type InfoDetailCompleteRouteProp = RouteProp<
  MypageStackParamList,
  'InfoDetail'
>;
export function MyPageScreen() {
  const {auth} = useAuthStore();
  // userName
  const navigation = useNavigation<MypageNavigationProp>();
  return (
    <SafeAreaView style={styles.fill}>
      <TabHeader text={'마이페이지'} />
      {/* 상단 */}
      <View style={styles.infoContainer}>
        {/* infoTitle & logo */}
        <View style={styles.info}>
          <Image
            style={styles.image}
            source={require('@/assets/images/mypageLogo.png')}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InfoDetail', {
                auth: auth,
              });
            }}
            style={styles.infoButtonWrap}>
            {auth && (
              <View style={styles.infoTitle}>
                <FontText
                  style={[
                    styles.nickName,
                    Platform.OS === 'android' && {fontWeight: '900'},
                  ]}>
                  {auth.nickName}
                </FontText>
                <FontText style={styles.userName}>{auth.userName}</FontText>
              </View>
            )}
            <Icon style={styles.icon} name="right" color={'black'} size={20} />
          </TouchableOpacity>
        </View>
        {/* infoBox */}
        {/* <View style={styles.infoBox}>
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() =>
              navigation.navigate('OwnReview', {
                auth: auth,
              })
            }>
            <View style={styles.reviewIcon}>
              <IconOct name="pencil" size={25} color={'white'} />
              <FontText style={styles.reviewText}>내가 쓴 후기</FontText>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={{marginTop: 30}}>
        <ThickBar />
      </View>
      {/* 하단 */}
      <View style={listStyles.listContainer}>
        <TextRightIcon
          text={'자주 묻는 질문'}
          onPress={() => {
            navigation.navigate('Question');
          }}
          isBar
        />
        <TextRightIcon
          text={'약관 및 동의 관리'}
          onPress={() => {
            navigation.navigate('TermMyPage');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const listStyles = StyleSheet.create({listContainer: {}});
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoContainer: {
    paddingHorizontal: 25,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 23,
  },
  infoButtonWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  infoBox: {
    height: 110,
    backgroundColor: '#0066FF',
    marginTop: 35,
    width: '100%',
    borderRadius: 12,
    marginBottom: 29,
  },
  infoTitle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  nickName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#979797',
  },
  image: {width: 64, height: 77, marginRight: 19, marginLeft: 18},
  icon: {
    position: 'absolute',
    right: 0,
  },
  reviewIcon: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  reviewButton: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
});
