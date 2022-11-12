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

// type currentTab = 'airport' | 'airline';

// TODO: 공항, 항공사 버튼 클릭에따른 UI 만들기
// TODO: 지도 연동 및 전화번호 바로가기 연동
export function HomeScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const {auth} = useAuthStore();
  const [data, setData] = useState<Data>();
  // const [currentTab, setCurrentTab] = useState<currentTab>('airport');

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
      </View>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.guideContainer}>
            <View style={styles.guideMessage}>
              {data?.schedule ? (
                <View style={styles.guideTextContainer}>
                  <FontText>
                    <FontText style={styles.greetMessage}>
                      {'안녕하세요 '}
                    </FontText>
                    <FontText style={[styles.greetMessage, styles.nickName]}>
                      {auth.nickName}!{'\n'}
                    </FontText>
                    <FontText style={styles.guideText}>{'오늘은 '}</FontText>
                    <FontText style={styles.greetMessage}>
                      {data.schedule.scheduleName}
                    </FontText>
                    <FontText style={styles.greetMessage}>
                      {'\n'}
                      {data.schedule.leftDay}
                    </FontText>
                    <FontText style={styles.guideText}>입니다</FontText>
                  </FontText>
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
            {data?.schedule ? (
              <>
                {/* <View style={styles.scheduleHeaderContainer}>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => {}}>
                    <FontText style={styles.headerText}>항공사</FontText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => {}}>
                    <FontText style={styles.headerText}>공항</FontText>
                  </TouchableOpacity>
                </View> */}
                <View style={styles.scheduleContainer}>
                  <View style={styles.scheduleInfoContainer}>
                    <View style={styles.infoHeader}>
                      <FontText style={styles.infoHeaderText}>
                        {data.schedule.scheduleName}
                      </FontText>
                      <View style={styles.leftDayContainer}>
                        <FontText style={styles.leftDayText}>
                          {data.schedule.leftDay}
                        </FontText>
                      </View>
                    </View>
                    <View style={styles.startAt}>
                      <FontText>{data.schedule.startAt}</FontText>
                    </View>
                    {/* 공항일때, 항공일때 나누기! */}
                    <View style={styles.serviceInfoContainer}>
                      <View style={styles.dotContainer}>
                        <View style={styles.circle} />
                        <View style={styles.dashedLine} />
                        <View style={styles.circle} />
                      </View>
                      <View style={styles.serviceTextContainer}>
                        <FontText style={styles.serviceProvider}>
                          {data.schedule.airlineName}
                        </FontText>
                        {data.schedule.airlineService.map((item, i) => (
                          <FontText key={i} style={styles.serviceItem}>
                            {item.name}
                          </FontText>
                        ))}
                      </View>
                    </View>
                    <View style={styles.detailContainer}>
                      {/* 이벤트 설정 */}
                      <TouchableOpacity
                        style={styles.detailTouchableContainer}
                        onPress={() => {}}>
                        <FontText style={styles.detailText}>
                          자세히 보기
                        </FontText>
                        <Icon
                          name="chevron-thin-right"
                          size={10}
                          style={styles.detailGoIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            ) : (
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
            )}
          </View>
          {/* <View style={[styles.serviceHeader, styles.serviceLocation]}>
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
          </View> */}
        </View>
      </ScrollView>
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
  scheduleContainer: {
    marginTop: 20,
    marginHorizontal: 4,

    borderRadius: 12,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 2,
    zIndex: 10,
  },
  scheduleHeaderContainer: {
    marginTop: 20,
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    zIndex: 1,
  },
  textContainer: {
    flex: 0.5,

    paddingVertical: 11,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 2,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 23,
    color: '#BCBCBC',
  },
  scheduleInfoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoHeaderText: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
  },
  leftDayContainer: {
    paddingHorizontal: 11,
    paddingVertical: 1,

    borderRadius: 12,
    backgroundColor: '#0066ff',
  },
  leftDayText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 24,
    color: '#ffffff',
  },
  startAt: {
    marginTop: 6,
    width: 81,
    height: 26,
    borderRadius: 29,
    backgroundColor: '#F8F8F8',

    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfoContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  dotContainer: {
    flex: 0.1,
    marginLeft: -6,
    alignItems: 'center',
  },
  serviceTextContainer: {
    flex: 0.9,
    marginLeft: 10,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8,

    backgroundColor: '#0066FF',
  },
  dashedLine: {
    width: 1,
    flex: 0.95,
    borderWidth: 1,
    borderColor: '#0066FF',
    borderStyle: 'dashed',
  },
  serviceProvider: {
    marginTop: -10,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#0066FF',
  },
  serviceItem: {
    marginTop: 8,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
  },
  detailContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailTouchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  detailText: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 20,
  },
  detailGoIcon: {
    marginLeft: 10,
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
