import {ArrowBack, FontText} from '@/components';
import type {
  AirlineService,
  AirportServices,
  ScheduleStackParamList,
} from '@/screens';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

type ScheduleReviewProp = RouteProp<ScheduleStackParamList, 'Write'>;

export function ScheduleReviewWrite() {
  const {
    params: {name, scheduleId, airId, services, logoImageUrl, region},
  } = useRoute<ScheduleReviewProp>();
  const isAirport = region !== undefined;

  console.log(scheduleId, airId, services);

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
            {'리뷰 작성하기'}
          </FontText>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.logoWrapper}>
            {isAirport ? (
              <FontText style={styles.logoText}>{region}</FontText>
            ) : (
              <Image style={styles.logo} source={{uri: logoImageUrl}} />
            )}
          </View>
          <View style={styles.serviceContainer}>
            <FontText style={styles.serviceName}>{name}</FontText>
            <View style={styles.serviceItemContainer}>
              {services.map(service => (
                <View
                  key={
                    isAirport
                      ? (service as AirportServices).airportServiceId
                      : (service as AirlineService).airlineServiceId
                  }
                  style={styles.serviceItem}>
                  <FontText style={styles.serviceItemText}>
                    {service.name}
                  </FontText>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.divideLine} />
        {/* <View style={styles.footer}>
          <SignButton
            isValid={true}
            buttonText="리뷰 작성완료"
            onPress={() => {}}
          />
        </View> */}
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
  reviewContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  imageContainer: {},
  serviceContainer: {
    marginTop: 10,
    marginLeft: 24,
  },
  logoWrapper: {
    width: 66,
    height: 66,
    backgroundColor: 'white',
    borderRadius: 66,
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowColor: '#0066FF',
  },
  logo: {
    width: 66,
    height: 66,
  },
  logoText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: '#0066FF',
  },
  serviceName: {
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 28,
  },
  serviceItemContainer: {
    marginTop: 10,
    marginLeft: -7,
  },
  serviceItem: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 7,

    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#0066FF',
  },
  serviceItemText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 24,
    color: '#0066FF',
  },
  divideLine: {
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  footer: {
    flex: 0.1,

    marginBottom: 34,
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
  },
});
