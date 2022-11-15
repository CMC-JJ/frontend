import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {ArrowBack, FontText} from '@/components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {request} from '@/utils';
import Icon from 'react-native-vector-icons/Entypo';
import {RootStackParamList} from '@/screens';
import AirCard from '@/components/service/AirCard';

type ScheduleDetailProp = RouteProp<RootStackParamList, 'ScheduleDetail'>;

type Schedule = {
  scheduleId: number;
  scheduleName: string;
  startAt: string;
  leftDay: string;
  departureAirportId: number;
  departureAirportName: string;
  departureAirportRegion: string;
  departureAirportCustomerServiceNumber: string;
  departureAirportWebsite: string;
  departureAirportAvgReview: string;
  arrivalAirportId: number;
  arrivalAirportName: string;
  arrivalAirportRegion: string;
  arrivalAirportCustomerServiceNumber: string;
  arrivalAirportWebsite: string;
  arrivalAirportAvgReview: string;
  airlineId: number;
  airlineName: string;
  logoImageUrl: string;
  airlineCustomerServiceNumber: string;
  airlineWebsite: string;
  airlineAvgReview: string;
  departureAirportService: string[];
  arrivalAirportService: string[];
  airlineService: string[];
};

type Data = {
  schedule: Schedule;
};

export function ScheduleDetail() {
  const {params: scheduleId} = useRoute<ScheduleDetailProp>();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    (async () => {
      const result = await request(
        `web/schedules/${scheduleId.scheduleId}`,
        {},
        'GET',
      );
      setData(result.result);
    })();
  }, [scheduleId]);

  const departureAirCardData = {
    id: (data as Data)?.schedule.departureAirportId,
    name: (data as Data)?.schedule.departureAirportName,
    avgReview: (data as Data)?.schedule.departureAirportAvgReview,
    customerServiceNumber: (data as Data)?.schedule
      .departureAirportCustomerServiceNumber,
    website: (data as Data)?.schedule.departureAirportWebsite,
  };
  const arrivalAirCardData = {
    id: (data as Data)?.schedule.arrivalAirportId,
    name: (data as Data)?.schedule.arrivalAirportName,
    avgReview: (data as Data)?.schedule.arrivalAirportAvgReview,
    customerServiceNumber: (data as Data)?.schedule
      .arrivalAirportCustomerServiceNumber,
    website: (data as Data)?.schedule.arrivalAirportWebsite,
  };
  const airlineAirCardData = {
    id: (data as Data)?.schedule.airlineId,
    name: (data as Data)?.schedule.airlineName,
    avgReview: (data as Data)?.schedule.airlineAvgReview,
    customerServiceNumber: (data as Data)?.schedule
      .airlineCustomerServiceNumber,
    website: (data as Data)?.schedule.airlineWebsite,
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} color="black" />}
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <FontText style={styles.header}>{'여행 상세정보'}</FontText>
          {/* TODO: 나중에 앱 업데이트시 수정하기 버튼 기능 넣기 */}
          {/* <TouchableOpacity style={styles.editButton} onPress={() => {}}>
            <FontText style={styles.editButtonText}>수정하기</FontText>
          </TouchableOpacity> */}
        </View>
        {/* 이 부분 카드 컴포넌트로 재활용 필요! */}
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {data?.schedule && (
          <>
            <View style={styles.cardContainer}>
              <View style={styles.cardHeaderContainer}>
                <FontText style={styles.cardHeader}>
                  {data.schedule.scheduleName}
                </FontText>
                {data?.schedule.leftDay && (
                  <View style={styles.dayleft}>
                    <FontText style={styles.day}>
                      {data.schedule.leftDay}
                    </FontText>
                  </View>
                )}
              </View>
              <View style={styles.startAt}>
                <FontText style={styles.startAtText}>
                  {data.schedule.startAt}
                </FontText>
              </View>
              <View style={styles.airSummary}>
                <View style={styles.airports}>
                  <FontText style={styles.airportText}>
                    {data.schedule.departureAirportName}
                  </FontText>
                  <Icon
                    name="aircraft-take-off"
                    size={20}
                    color="#0066FF"
                    style={styles.aircraft}
                  />
                  <FontText style={styles.airportText}>
                    {data.schedule.arrivalAirportName}
                  </FontText>
                </View>
                <View style={styles.dotContainer}>
                  <View style={styles.circle} />
                  <View style={styles.dotBorder} />
                  <View style={styles.circle} />
                </View>
                <View style={styles.airline}>
                  <FontText style={styles.airlineText}>
                    {data.schedule.airlineName}
                  </FontText>
                </View>
              </View>
              <View style={styles.serviceContainerWrapper}>
                <View style={styles.serviceContainer}>
                  <View style={styles.circle2} />
                  <FontText style={styles.serviceHeaderText}>
                    {data.schedule.departureAirportName}
                  </FontText>
                  {data.schedule.departureAirportService.map(
                    (service: string, index: number) => (
                      <FontText key={index} style={styles.serviceItemText}>
                        {service}
                      </FontText>
                    ),
                  )}
                </View>
                <View style={styles.serviceContainer}>
                  <View style={styles.circle2} />
                  <FontText style={styles.serviceHeaderText}>
                    {data.schedule.arrivalAirportName}
                  </FontText>
                  {data.schedule.arrivalAirportService.map(
                    (service: string, index: number) => (
                      <FontText key={index} style={styles.serviceItemText}>
                        {service}
                      </FontText>
                    ),
                  )}
                </View>
                <View style={styles.serviceContainer}>
                  <View style={styles.circle2} />
                  <FontText style={styles.serviceHeaderText}>
                    {data.schedule.airlineName}
                  </FontText>
                  {data.schedule.airlineService.map(
                    (service: string, index: number) => (
                      <FontText key={index} style={styles.serviceItemText}>
                        {service}
                      </FontText>
                    ),
                  )}
                </View>
              </View>
            </View>
            {/* TODO: 로고 나오게 바꾸기 */}
            <View style={styles.aircardContainer}>
              <AirCard data={departureAirCardData} />
              <View style={{marginTop: 20}} />
              <AirCard data={arrivalAirCardData} />
              <View style={{marginTop: 20}} />
              <AirCard data={airlineAirCardData} />
            </View>
          </>
        )}
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
  container: {
    marginTop: 25,
    paddingHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 34,
    color: 'black',
  },
  scrollViewContainer: {
    paddingHorizontal: 25,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 1.5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#0066FF',
  },
  editButtonText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 24,
    color: '#0066FF',
  },
  cardContainer: {
    marginTop: 20,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    borderRadius: 12,

    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  cardHeaderContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeader: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
  },
  dayleft: {
    minWidth: 45,
    height: 27,
    borderRadius: 59,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 24,
    color: '#FFFFFF',
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
  pastStartAt: {
    marginTop: 0,
  },
  startAtText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 24,
  },
  airSummary: {
    marginTop: 20,
    paddingHorizontal: 18,
  },
  airports: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airportText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
  },
  aircraft: {
    position: 'absolute',
    left: '47%',
    top: 13,
  },
  dotContainer: {
    marginTop: 15,
    paddingHorizontal: 42,
    flexDirection: 'row',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#0066FF',

    top: -4,
  },
  dotBorder: {
    width: '100%',
    borderColor: '#0066FF',
    borderWidth: 1,
    height: 1,
    borderStyle: 'dashed',
  },
  airline: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  airlineText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#0066FF',
  },
  serviceContainerWrapper: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  serviceContainer: {
    marginTop: 30,
  },
  serviceHeaderText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#0066FF',
  },
  circle2: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#0066FF',

    top: 8,
    left: -17,
  },
  serviceItemText: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
  },
  aircardContainer: {
    marginTop: 20,
    marginBottom: 100,
    paddingHorizontal: 2,
  },
});
