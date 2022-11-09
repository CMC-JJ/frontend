import {FontText} from '@/components';
import {useAuthStore} from '@/store';
import {request} from '@/utils';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

export function HomeScreen() {
  const {auth} = useAuthStore();
  const [data, setData] = useState();

  const fetchSchedule = useCallback(async () => {
    const result = await request(
      'web/schedules/home',
      {},
      'GET',
      auth.jwtToken,
    );
    setData(result.result);
  }, [auth.jwtToken]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.wrapper}>
        <View style={styles.logoHeader}>
          <Image
            source={require('@/assets/images/homeLogo.png')}
            style={styles.logo}
          />
          <Image
            source={require('@/assets/images/goTogether.png')}
            resizeMode="contain"
            style={styles.logoText}
          />
        </View>
        <View style={styles.guideMessage}>
          {data?.schedule ? (
            <FontText style={styles.guideText}>
              안녕하세요 {auth.nickName}! 오늘은 {data.schedule.scheduleName}{' '}
              {data.schedule.leftDay}입니다.
            </FontText>
          ) : (
            <FontText style={styles.guideText}>
              안녕하세요 {auth.nickName}! 가치가자와 함께 떠나요!
            </FontText>
          )}
        </View>
        <View style={styles.serviceContainer}>
          <View style={styles.serviceHeader}>
            <Image
              source={require('@/assets/images/calendar.png')}
              style={styles.calendar}
            />
            <FontText style={styles.serviceHeaderText}>
              제공받는 여행 서비스
            </FontText>
          </View>
        </View>
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
  wrapper: {
    paddingHorizontal: 25,
  },
  logoHeader: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 42,
    height: 42,
  },
  logoText: {
    width: 72,
    height: 20,
    marginLeft: 7,
  },
  guideMessage: {
    marginTop: 40,
  },
  guideText: {
    width: 200,
    fontWeight: '400',
    fontSize: 26,
    lineHeight: 34,
  },
  serviceContainer: {
    marginTop: 40,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendar: {
    width: 30,
    height: 30,
  },
  serviceHeaderText: {
    marginLeft: 2,
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 28,
  },
});
