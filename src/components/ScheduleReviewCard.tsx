import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FontText} from './FontText';
import Icon from 'react-native-vector-icons/AntDesign';

type AirportServices = {
  airportServiceId: number;
  name: string;
};

type AirlineService = {
  airlineServiceId: number;
  name: string;
};

type ScheduleReviewCardProps = {
  name: string;
  service: AirportServices[] | AirlineService[];
  logoImageUrl?: string;
  region?: string;
  reviewStatus: string;
};

export function ScheduleReviewCard({
  name,
  service,
  logoImageUrl,
  region,
  reviewStatus,
}: ScheduleReviewCardProps) {
  const isAirport = region !== undefined;
  const isComplete = reviewStatus === '작성완료';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderContainer}>
        <>
          <View style={styles.cardLogoContainer}>
            <View style={styles.logoWrapper}>
              {isAirport ? (
                <FontText style={styles.logoText}>{region}</FontText>
              ) : (
                <Image style={styles.logo} source={{uri: logoImageUrl}} />
              )}
            </View>
            <FontText style={styles.cardHeader}>{name}</FontText>
          </View>
          <View
            style={[
              styles.reviewStatus,
              isComplete && styles.reviewStatusComplete,
            ]}>
            <FontText
              style={[
                styles.reviewStatusText,
                isComplete && styles.reviewStatusTextComplete,
              ]}>
              {reviewStatus}
            </FontText>
          </View>
        </>
      </View>
      <View style={styles.serviceContainer}>
        {service.map(item => (
          <View
            key={
              isAirport
                ? (item as AirportServices).airportServiceId
                : (item as AirlineService).airlineServiceId
            }
            style={styles.serviceItem}>
            <FontText style={styles.serviceItemText}>{item.name}</FontText>
          </View>
        ))}
      </View>
      <Icon name="right" style={styles.rightIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    borderRadius: 20,

    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 4,
  },
  cardHeaderContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alginItems: 'center',
  },
  logoWrapper: {
    width: 33,
    height: 33,
    backgroundColor: 'white',
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowColor: '#0066FF',
  },
  logo: {
    width: 33,
    height: 33,
  },
  logoText: {
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 28,
    color: '#0066FF',
  },
  cardHeader: {
    marginTop: 4,
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 25,
  },
  reviewStatus: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: '#D8D8D8',
    borderRadius: 28,

    justifyContent: 'center',
    alingItems: 'center',
  },
  reviewStatusComplete: {
    backgroundColor: '#0066FF',
  },
  reviewStatusText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 24,
    color: '#7C7C7C',
  },
  reviewStatusTextComplete: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  serviceContainer: {
    marginTop: 15,
    marginLeft: -7,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceContainerWrapper: {
    flex: 0.9,
  },
  serviceItem: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 7,

    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#7C7C7C',
  },
  serviceItemText: {
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 24,
    color: '#7C7C7C',
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
});
