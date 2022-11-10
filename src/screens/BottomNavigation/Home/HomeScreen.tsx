import {FontText} from '@/components';
import {useAuthStore} from '@/store';
import {request} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import type {MainTabNavigationProp} from '@/screens';

type departureAirportService = {
  airportServiceId: number;
  name: string;
  website: string;
};
type arrivalAirportService = {
  airportServiceId: number;
  name: string;
  website: string;
};
type airlineService = {
  airlineServiceId: number;
  name: string;
  website: string;
};

type Schedule = {
  scheduleId: number;
  airlineId: number;
  airlineName: string;
  arrivalAirportId: number;
  arrivalAirportName: string;
  departureAirportId: number;
  departureAirportName: string;
  leftDay: string;
  scheduleName: string;
  startAt: string;
  departureAirportService: departureAirportService[];
  arrivalAirportService: arrivalAirportService[];
  airlineService: airlineService[];
};

type Data = {
  schedule: Schedule;
};

export function HomeScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const {auth} = useAuthStore();
  const [data, setData] = useState<Data>();

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
        <ScrollView>
          <View style={styles.guideContainer}>
            <View style={styles.guideMessage}>
              {data?.schedule ? (
                <View style={styles.guideTextContainer}>
                  <FontText style={styles.greetMessage}>
                    {'안녕하세요 '}
                  </FontText>
                  <FontText style={[styles.greetMessage, styles.nickName]}>
                    {auth.nickName}!
                  </FontText>
                  {/* 오늘은 {data.schedule.scheduleName}{' '}
                {data.schedule.leftDay}입니다. */}
                </View>
              ) : (
                <View style={styles.guideTextContainer}>
                  <FontText style={styles.greetMessage}>안녕하세요</FontText>
                  <FontText style={[styles.greetMessage, styles.nickName]}>
                    {auth.nickName}!
                  </FontText>
                  <View>
                    <FontText style={styles.guideText}>
                      가치가자와 함께
                    </FontText>
                    <FontText style={styles.guideText}>떠나요!</FontText>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.mainLogoContainer}>
              <Image
                source={require('@/assets/images/mainLogo.png')}
                resizeMode="contain"
                style={styles.mainLogo}
              />
            </View>
          </View>
          <View style={styles.serviceContainer}>
            <View style={styles.serviceHeader}>
              <Image
                source={require('@/assets/images/calendarShadow.png')}
                style={styles.calendar}
              />
              <FontText style={styles.serviceHeaderText}>
                제공받는 여행 서비스
              </FontText>
            </View>
            {/* TODO: 데이터 있을때, 없을 때 구분! */}
            <View style={styles.noScheduleContainer}>
              <View style={styles.tempCircle} />
              <View style={styles.noTextContainer}>
                <FontText style={styles.noText}>현재 등록된 여행이</FontText>
                <FontText style={styles.noText}>없습니다!</FontText>
              </View>
              <TouchableOpacity
                style={styles.addSchedule}
                onPress={() => {
                  navigation.navigate('Schedule');
                }}>
                <FontText style={styles.addText}>여행 등록하기</FontText>
                <Icon name="chevron-right" color="#0066FF" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.serviceHeader, styles.serviceLocation]}>
            <View style={styles.serviceTitle}>
              <Image
                source={require('@/assets/images/location.png')}
                style={styles.calendar}
              />
              <FontText style={styles.serviceHeaderText}>
                친구 위치보기
              </FontText>
            </View>
            <View style={styles.selectOption}>
              <FontText style={styles.selectText}>선택해주세요</FontText>
              <Icon
                style={styles.downIcon}
                name="chevron-thin-down"
                color="#0066FF"
                size={15}
              />
            </View>
          </View>
          <View style={styles.mapContainer}>
            <FontText style={styles.mapText}>내위치</FontText>
            <TouchableOpacity style={styles.currentLocation}>
              <Image
                source={require('@/assets/images/currentLocation.png')}
                style={styles.currentLocationIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  guideContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  guideMessage: {
    width: '65%',
    marginTop: 13,
  },
  guideTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  greetMessage: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 34,
  },
  guideText: {
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 34,
  },
  nickName: {
    color: '#0066FF',
    marginLeft: 8,
  },
  mainLogoContainer: {
    width: '30%',
  },
  mainLogo: {
    width: 120,
    height: 145,
  },
  serviceContainer: {
    marginTop: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
  },
  serviceHeaderText: {
    marginLeft: 2,
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 28,
  },
  serviceTitle: {
    flexDirection: 'row',
  },
  noScheduleContainer: {
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempCircle: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#D9D9D9',
  },
  noTextContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  noText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
  },
  calendar: {
    width: 30,
    height: 30,
  },
  addSchedule: {
    flexDirection: 'row',
    marginTop: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    marginRight: 2,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: '#0066FF',
  },
  serviceLocation: {
    marginTop: 40,
    justifyContent: 'space-between',
  },
  selectOption: {
    width: 115,
    height: 34,
    marginTop: -5,
    marginRight: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    elevation: 2,
  },
  selectText: {
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 24,
    color: '#0066FF',
  },
  downIcon: {
    marginLeft: 4,
  },
  mapContainer: {
    marginTop: 20,
    marginHorizontal: 5,
    marginBottom: 250,

    height: 170,

    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 2,
  },
  mapText: {
    marginTop: 12,
    marginLeft: 18,

    fontWeight: '700',
    fontSize: 18,
    lineHeight: 23,
  },
  currentLocation: {
    position: 'absolute',
    width: 38,
    height: 38,

    justifyContent: 'center',
    alingItems: 'center',

    right: 14,
    bottom: 17,

    borderRadius: 38,
    backgroundColor: '#ffffff',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 2,
  },
  currentLocationIcon: {
    width: 20,
    height: 20,

    marginLeft: 9,
  },
});
