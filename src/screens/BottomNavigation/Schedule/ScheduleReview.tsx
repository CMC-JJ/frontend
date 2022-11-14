import {
  ArrowBack,
  FontText,
  ScheduleReviewCard,
  SignButton,
} from '@/components';
import {request} from '@/utils';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type {ScheduleNavigationProp, ScheduleStackParamList} from '@/screens';

type AirportServices = {
  airportServiceId: number;
  name: string;
};

type AirlineService = {
  airlineServiceId: number;
  name: string;
};

type AirportReview = {
  airportId: number;
  airportName: string;
  region: string;
  airportServices: AirportServices[];
  reviewStatus: string;
};

type AirlineReview = {
  airlineId: number;
  airlineName: string;
  logoImageUrl: string;
  airlineServices: AirlineService[];
  reviewStatus: string;
};

type Review = {
  departureAirport: AirportReview;
  arrivalAirport: AirportReview;
  airline: AirlineReview;
};

type ScheduleReviewProp = RouteProp<ScheduleStackParamList, 'Review'>;

export function ScheduleReview() {
  const navigation = useNavigation<ScheduleNavigationProp>();
  const {params: scheduleId} = useRoute<ScheduleReviewProp>();
  const [data, setData] = useState<Review>();
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (
      data?.departureAirport.reviewStatus === '작성완료' ||
      data?.arrivalAirport.reviewStatus === '작성완료' ||
      data?.airline.reviewStatus === '작성완료'
    ) {
      setIsValid(true);
    }
  }, [
    data?.airline.reviewStatus,
    data?.arrivalAirport.reviewStatus,
    data?.departureAirport.reviewStatus,
  ]);

  useEffect(() => {
    (async () => {
      const res = await request(
        `web/schedules/${scheduleId.scheduleId}/reviews`,
        {},
        'GET',
      );
      setData(res.result);
    })();
  }, [scheduleId]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {display: 'none'},
      });
    }, [navigation]),
  );

  console.log(data);

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} color="black" />}
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <FontText
            style={[
              styles.header,
              Platform.OS === 'android' && {fontWeight: '900'},
            ]}>
            {'리뷰 작성을 원하는\n서비스를 선택해주세요'}
          </FontText>
        </View>
        {data && (
          <TouchableOpacity
            onPress={() => {}}
            disabled={data.departureAirport.reviewStatus === '작성완료'}>
            <ScheduleReviewCard
              id={data.departureAirport.airportId}
              name={data.departureAirport.airportName}
              service={data.departureAirport.airportServices}
              reviewStatus={data.departureAirport.reviewStatus}
              region={data.departureAirport.region}
            />
          </TouchableOpacity>
        )}
        {data && (
          <TouchableOpacity
            onPress={() => {}}
            disabled={data.departureAirport.reviewStatus === '작성완료'}>
            <ScheduleReviewCard
              id={data.arrivalAirport.airportId}
              name={data.arrivalAirport.airportName}
              service={data.arrivalAirport.airportServices}
              reviewStatus={data.arrivalAirport.reviewStatus}
              region={data.arrivalAirport.region}
            />
          </TouchableOpacity>
        )}
        {data && (
          <TouchableOpacity
            onPress={() => {}}
            disabled={data.departureAirport.reviewStatus === '작성완료'}>
            <ScheduleReviewCard
              id={data.airline.airlineId}
              name={data.airline.airlineName}
              service={data.airline.airlineServices}
              reviewStatus={data.airline.reviewStatus}
              logoImageUrl={data.airline.logoImageUrl}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* 작성완료가 하나라도 있어야 isValid 되어야함 */}
      <View style={styles.footer}>
        <SignButton isValid={isValid} buttonText="확인" onPress={() => {}} />
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
    flex: 0.9,
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
  footer: {
    flex: 0.1,

    marginBottom: 34,
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
  },
});
