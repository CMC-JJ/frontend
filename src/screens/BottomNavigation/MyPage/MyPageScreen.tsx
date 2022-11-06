import {TabHeader} from '@/components';
import FontText from '@/components/FontText';
import {useAuthStore} from '@/store';
import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

export function MyPageScreen() {
  const {phoneNumber, nickName} = useAuthStore().auth;
  return (
    <SafeAreaView style={styles.fill}>
      <TabHeader text={'마이페이지'} />
      {/* 상단 */}
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Image
            style={styles.image}
            source={require('@/assets/images/mypageLogo.png')}
          />
          <View style={styles.infoTitle}>
            <FontText
              style={[
                styles.nickName,
                Platform.OS === 'android' && {fontWeight: '900'},
              ]}>
              {nickName}
            </FontText>
            <FontText style={styles.phoneNumber}>{phoneNumber}</FontText>
          </View>
          <Icon style={styles.icon} name="right" color={'black'} size={20} />
        </View>
        <View style={styles.infoBox} />
      </View>
      {/* 하단 */}
      <View style={styles.listContainer} />
    </SafeAreaView>
  );
}

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
  infoBox: {},
  infoTitle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  nickName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
  },
  phoneNumber: {
    fontSize: 15,
    fontWeight: '500',
    color: '#979797',
  },
  image: {width: 64, height: 77, marginRight: 19},
  icon: {
    position: 'absolute',
    right: 0,
  },
  listContainer: {},
});
