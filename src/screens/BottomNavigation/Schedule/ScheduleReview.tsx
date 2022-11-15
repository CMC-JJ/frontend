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
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type {ScheduleNavigationProp, ScheduleStackParamList} from '@/screens';

export type AirportServices = {
  airportServiceId: number;
  name: string;
};

export type AirlineService = {
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

  useLayoutEffect(() => {
    (async () => {
      const res = await request(
        `web/schedules/${scheduleId.scheduleId}/reviews`,
        {},
        'GET',
      );

      setData(res.result);
    })();
  }, [scheduleId]);

  useEffect(() => {
    if (
      data?.departureAirport?.reviewStatus === '작성완료' ||
      data?.arrivalAirport?.reviewStatus === '작성완료' ||
      data?.airline?.reviewStatus === '작성완료'
    ) {
      setIsValid(true);
    }
  }, [
    data?.airline?.reviewStatus,
    data?.arrivalAirport?.reviewStatus,
    data?.departureAirport?.reviewStatus,
  ]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {display: 'none'},
      });
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} color="black" />}
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <FontText style={styles.header}>
            {'리뷰 작성을 원하는\n서비스를 선택해주세요'}
          </FontText>
        </View>
        <ScrollView>
          <View style={styles.marginBottomForScroll}>
            {data?.departureAirport && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Write', {
                    name: data.departureAirport.airportName,
                    scheduleId: scheduleId.scheduleId,
                    airId: data.departureAirport.airportId,
                    services: data.departureAirport.airportServices,
                    region: data.departureAirport.region,
                  });
                }}
                disabled={data.departureAirport.reviewStatus === '작성완료'}>
                <ScheduleReviewCard
                  name={data.departureAirport.airportName}
                  service={data.departureAirport.airportServices}
                  reviewStatus={data.departureAirport.reviewStatus}
                  region={data.departureAirport.region}
                />
              </TouchableOpacity>
            )}
            {data?.arrivalAirport && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Write', {
                    name: data.arrivalAirport.airportName,
                    scheduleId: scheduleId.scheduleId,
                    airId: data.arrivalAirport.airportId,
                    services: data.arrivalAirport.airportServices,
                    region: data.arrivalAirport.region,
                  });
                }}
                disabled={data.arrivalAirport.reviewStatus === '작성완료'}>
                <ScheduleReviewCard
                  name={data.arrivalAirport.airportName}
                  service={data.arrivalAirport.airportServices}
                  reviewStatus={data.arrivalAirport.reviewStatus}
                  region={data.arrivalAirport.region}
                />
              </TouchableOpacity>
            )}
            {data?.airline && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Write', {
                    name: data.airline.airlineName,
                    scheduleId: scheduleId.scheduleId,
                    airId: data.airline.airlineId,
                    services: data.airline.airlineServices,
                    logoImageUrl: data.airline.logoImageUrl,
                  });
                }}
                disabled={data.airline.reviewStatus === '작성완료'}>
                <ScheduleReviewCard
                  name={data.airline.airlineName}
                  service={data.airline.airlineServices}
                  reviewStatus={data.airline.reviewStatus}
                  logoImageUrl={data.airline.logoImageUrl}
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid={isValid}
          buttonText="확인"
          onPress={() => {
            navigation.navigate('ScheduleScreen', {
              refresh: true,
            });
          }}
        />
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
  marginBottomForScroll: {
    marginBottom: 100,
  },
  footer: {
    flex: 0.1,

    marginBottom: 34,
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
  },
});
