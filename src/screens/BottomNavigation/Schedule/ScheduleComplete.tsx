import {ArrowBack, FontText, SignButton} from '@/components';
import {AIRLINE, AIRPORT} from '@/constants';
import {useAuthStore, useScheduleStore} from '@/store';
import {request} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import type {ScheduleNavigationProp} from './ScheduleStack';

// TODO: 공항 서비스 연동 필요!
export function ScheduleComplete() {
  const navigation = useNavigation<ScheduleNavigationProp>();
  const {schedule, initializeSchedule} = useScheduleStore();
  const {auth} = useAuthStore();

  const onPress = async () => {
    const result = await request(
      'web/schedules',
      {
        userId: auth.userId,
        startAt: schedule.startAt,
        name: schedule.name,
        departureAirportId: schedule.departureAirportId,
        arrivalAirportId: schedule.arrivalAirportId,
        airlineId: schedule.airlineId,
        departureAirportServiceIds: schedule.departureAirportServiceIds,
        arrivalAirportServiceIds: schedule.arrivalAirportServiceIds,
        airlineServiceIds: schedule.airlineServiceIds,
      },
      'POST',
      auth.jwtToken,
    );

    if (result.isSuccess) {
      initializeSchedule();
      navigation.navigate('Home');
    } else {
      Alert.alert(result.message);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.fill}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.back}>
          {Platform.OS === 'ios' && <ArrowBack size={28} color="white" />}
        </View>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <FontText
              style={[
                styles.header,
                Platform.OS === 'android' && {fontWeight: '900'},
              ]}>
              {'여행이 등록되었습니다!\n즐거운 여행 되세요 :)'}
            </FontText>
          </View>
          <View style={styles.ticketContainer}>
            <ScrollView>
              <View style={styles.scheduleInfo}>
                <FontText style={styles.scheduleInfoText}>
                  {schedule.name}
                </FontText>
                <FontText style={styles.scheduleInfoText}>
                  {schedule.startAt.slice(0, 10)}
                </FontText>
              </View>
              <View style={styles.wrapper}>
                <View style={styles.airInfo}>
                  <View style={styles.airInfoTextContainer}>
                    <FontText style={styles.direction}>출발</FontText>
                    <FontText style={styles.place}>
                      {AIRPORT[schedule.departureAirportId]}
                    </FontText>
                  </View>
                  <View style={styles.airInfoImageContainer}>
                    <Icon name="aircraft-take-off" size={20} color="#0066ff" />
                    <View style={styles.dotContainer}>
                      <View style={styles.circle} />
                      <View style={styles.dotBorder} />
                      <View style={styles.circle} />
                    </View>
                    <FontText style={styles.airlineName}>
                      {AIRLINE[schedule.airlineId].name}
                    </FontText>
                  </View>
                  <View style={styles.airInfoTextContainer}>
                    <FontText style={styles.direction}>도착</FontText>
                    <FontText style={styles.place}>
                      {AIRPORT[schedule.arrivalAirportId]}
                    </FontText>
                  </View>
                </View>
              </View>
              <View style={styles.dotBorderLine} />
              <View style={styles.serviceInfo}>
                <View style={styles.serviceContainer}>
                  <View style={styles.circle2} />
                  <View style={styles.serviceTextConatiner}>
                    <FontText style={styles.serviceTextHeader}>
                      {AIRPORT[schedule.departureAirportId]}
                    </FontText>
                    <FontText style={styles.serviceText}>
                      임산부, 유아, 어린이 동반
                    </FontText>
                    <FontText style={styles.serviceText}>
                      장애인, 고령자 동반
                    </FontText>
                    {/* {schedule.departureAirportServiceIds.map(item => (
                      <FontText key={item} style={styles.serviceText}>
                        {item}
                      </FontText>
                    ))} */}
                  </View>
                </View>
                <View style={styles.serviceContainer}>
                  <View style={styles.circle2} />
                  <View style={styles.serviceTextConatiner}>
                    <FontText style={styles.serviceTextHeader}>
                      {AIRPORT[schedule.arrivalAirportId]}
                    </FontText>
                    {/* {schedule.arrivalAirportServiceIds.map(item => (
                      <FontText key={item} style={styles.serviceText}>
                        {item}
                      </FontText>
                    ))} */}
                    <FontText style={styles.serviceText}>
                      교통약자 동반
                    </FontText>
                    <FontText style={styles.serviceText}>
                      반려동물 동반
                    </FontText>
                  </View>
                </View>
                {/* TODO: scrollView 깨지는거 확인되면 marginBottom 넣기 */}
                <View style={styles.serviceContainer}>
                  <View style={styles.circle2} />
                  <View style={styles.serviceTextConatiner}>
                    <FontText style={styles.serviceTextHeader}>
                      {AIRLINE[schedule.airlineId].name}
                    </FontText>
                    {/* {schedule.airlineServiceIds.map(item => (
                      <FontText key={item} style={styles.serviceText}>
                        {item}
                      </FontText>
                    ))} */}
                    <FontText style={styles.serviceText}>
                      임산부/유아동반 손님
                    </FontText>
                    <FontText style={styles.serviceText}>
                      반려동물 동반 손님
                    </FontText>
                    <FontText style={styles.serviceText}>
                      휠체어 서비스 필요 손님
                    </FontText>
                  </View>
                </View>
              </View>
              {/* <View style={styles.ticketRemove}>
                <View style={styles.circle3} />
                <View style={styles.dotBorderLine2} />
                <View style={styles.circle4} />
              </View> */}
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <SignButton isValid={true} buttonText="확인" onPress={onPress} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#0066FF',
  },
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  headerContainer: {
    marginTop: 25,
  },
  header: {
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 34,
    color: 'white',
  },
  ticketContainer: {
    flex: 1,
    marginTop: 33,
    paddingHorizontal: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
  },
  scheduleInfo: {
    marginTop: 14,
    paddingHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleInfoText: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 23,
    color: '#7C7C7C',
  },
  wrapper: {
    marginRight: 10,
  },
  airInfo: {
    marginTop: 40,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airInfoTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  airInfoImageContainer: {
    marginTop: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  direction: {
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 26,
    color: '#0066FF',
  },
  place: {
    marginTop: 11,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
  },
  airlineName: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#0066FF',
  },
  dotContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flexShrink: 1,
  },
  circle: {
    top: -4,
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#0066FF',
  },
  dotBorder: {
    width: '55%',
    borderColor: '#0066FF',
    borderWidth: 1,
    height: 1,
    borderStyle: 'dashed',
  },
  dotBorderLine: {
    marginTop: 40,
    paddingHorizontal: 15,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    height: 1,
    borderStyle: 'dashed',
  },
  dotBorderLine2: {
    marginTop: 35,
    paddingHorizontal: 15,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    height: 1,
    borderStyle: 'dashed',
  },
  serviceInfo: {
    marginTop: 8,
    paddingHorizontal: 30,
  },
  serviceContainer: {
    flexDirection: 'row',
    marginTop: 22,
  },
  circle2: {
    marginTop: 7,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: '#0066FF',
  },
  ticketRemove: {},
  circle3: {
    position: 'absolute',
    marginLeft: -20,
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#0066FF',
    zIndex: 1000,
  },
  circle4: {
    position: 'absolute',
    right: -20,
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#0066FF',
    zIndex: 1000,
    elevation: 1000,
  },
  serviceTextConatiner: {
    marginLeft: 17,
  },
  serviceTextHeader: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#0066FF',
  },
  serviceText: {
    marginTop: 9,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 25,

    width: '100%',

    marginBottom: 15,
    alignSelf: 'center',
  },
});
