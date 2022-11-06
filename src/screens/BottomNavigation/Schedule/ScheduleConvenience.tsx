import {
  ArrowBack,
  DateDisplay,
  FontText,
  ServiceItem,
  SignButton,
} from '@/components';
import {AIRLINE, AIRPORT} from '@/constants';
import {useAuthStore, useScheduleStore} from '@/store';
import {request} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import type {ScheduleNavigationProp} from './ScheduleStack';

type AirportService = {
  id: number;
  name: string;
};

type AirportServiceData = AirportService[];

type AirlineService = {
  id: number;
  name: string;
};

type AirlineServiceData = AirlineService[];

export function ScheduleConvenience() {
  const navigation = useNavigation<ScheduleNavigationProp>();
  const {schedule, setSchedule} = useScheduleStore();
  const {auth} = useAuthStore();

  const [departureAirportService, setDepartureAirportService] =
    useState<AirportServiceData>([]);
  const [arrivalAirportService, setArrivalAirportService] =
    useState<AirportServiceData>([]);
  const [airlineService, setAirlineService] = useState<AirlineServiceData>([]);

  useEffect(() => {
    Promise.all([
      request(
        `web/airlines/${schedule.airlineId}/services`,
        {},
        'GET',
        auth.jwtToken,
      ),
      request(
        `web/airports/${schedule.departureAirportId}/services`,
        {},
        'GET',
        auth.jwtToken,
      ),
      request(
        `web/airports/${schedule.arrivalAirportId}/services`,
        {},
        'GET',
        auth.jwtToken,
      ),
    ]).then(res =>
      res.forEach((result, i) => {
        if (i === 0) {
          setAirlineService([
            {id: 0, name: '선택 없음'},
            ...result.result.airlineServices,
          ]);
        } else if (i === 1) {
          setDepartureAirportService([
            {id: 0, name: '선택 없음'},
            ...result.result.airportServices,
          ]);
        } else {
          setArrivalAirportService([
            {id: 0, name: '선택 없음'},
            ...result.result.airportServices,
          ]);
        }
      }),
    );
  }, [
    auth.jwtToken,
    schedule.airlineId,
    schedule.arrivalAirportId,
    schedule.departureAirportId,
  ]);

  const [departureExpanded, setDepartureExpanded] = useState<boolean>(false);
  const [arrivalExpanded, setArrivalExpanded] = useState<boolean>(false);
  const [airlineExpanded, setAirlineExpanded] = useState<boolean>(false);

  const [selectedDepartureServiceIds, setSelectedDepartureServiceIds] =
    useState<number[]>([]);
  const [selectedArrivalServiceIds, setSelectedArrivalServiceIds] = useState<
    number[]
  >([]);
  const [selectedAirlineServiceIds, setSelectedAirlineServiceIds] = useState<
    number[]
  >([]);

  const onSelectDeparture = useCallback(
    (id: number) => {
      if (selectedDepartureServiceIds.includes(id)) {
        setSelectedDepartureServiceIds(
          selectedDepartureServiceIds.filter(serviceId => serviceId !== id),
        );
      } else {
        setSelectedDepartureServiceIds([...selectedDepartureServiceIds, id]);
      }
    },
    [selectedDepartureServiceIds],
  );
  const onSelectArrival = useCallback(
    (id: number) => {
      if (selectedArrivalServiceIds.includes(id)) {
        setSelectedArrivalServiceIds(
          selectedArrivalServiceIds.filter(serviceId => serviceId !== id),
        );
      } else {
        setSelectedArrivalServiceIds([...selectedArrivalServiceIds, id]);
      }
    },
    [selectedArrivalServiceIds],
  );
  const onSelectAirline = useCallback(
    (id: number) => {
      if (selectedAirlineServiceIds.includes(id)) {
        setSelectedAirlineServiceIds(
          selectedAirlineServiceIds.filter(serviceId => serviceId !== id),
        );
      } else {
        setSelectedAirlineServiceIds([...selectedAirlineServiceIds, id]);
      }
    },
    [selectedAirlineServiceIds],
  );

  const onPress = () => {
    setSchedule('departureAirportServiceIds', [
      ...selectedDepartureServiceIds.filter(id => id !== 0),
    ]);
    setSchedule('arrivalAirportServiceIds', [
      ...selectedArrivalServiceIds.filter(id => id !== 0),
    ]);
    setSchedule('airlineServiceIds', [
      ...selectedAirlineServiceIds.filter(id => id !== 0),
    ]);

    navigation.navigate('Complete');
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.back}>
          {Platform.OS === 'ios' && <ArrowBack size={28} />}
        </View>
        <View style={styles.container}>
          <View style={styles.dateDisplayContainer}>
            <DateDisplay startDate={schedule.startAt} />
          </View>
          <FontText
            style={[
              styles.headerText,
              Platform.OS === 'android' && {fontWeight: '900'},
            ]}>
            {'이용하실 서비스를\n선택해주세요'}
          </FontText>
          <View style={styles.airSummary}>
            <View style={styles.airports}>
              <FontText style={styles.airportText}>
                {AIRPORT[schedule.departureAirportId]}
              </FontText>
              <Icon
                name="aircraft-take-off"
                size={20}
                color="#0066FF"
                style={styles.aircraft}
              />
              <FontText style={styles.airportText}>
                {AIRPORT[schedule.arrivalAirportId]}
              </FontText>
            </View>
            <View style={styles.dotContainer}>
              <View style={styles.circle} />
              <View style={styles.dotBorder} />
              <View style={styles.circle} />
            </View>
            <View style={styles.airline}>
              <FontText style={styles.airlineText}>
                {AIRLINE[schedule.airlineId].name}
              </FontText>
            </View>
          </View>
        </View>
        <View style={styles.serviceContainer}>
          <TouchableOpacity
            onPress={() => setDepartureExpanded(!departureExpanded)}
            style={styles.serviceHeaderContainer}>
            <FontText style={styles.serviceHeader}>출발지 제공 서비스</FontText>
            <MIcon
              name={
                departureExpanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'
              }
              size={24}
              color="#000000"
              style={styles.arrow}
            />
          </TouchableOpacity>
          {departureExpanded && (
            <View style={styles.serviceItemContainer}>
              {departureAirportService.map(item => (
                <ServiceItem
                  key={item.id.toString()}
                  id={item.id}
                  name={item.name}
                  isChecked={selectedDepartureServiceIds.includes(item.id)}
                  onSelect={onSelectDeparture}
                />
              ))}
            </View>
          )}
          <View style={styles.divideLine} />
          <TouchableOpacity
            onPress={() => setArrivalExpanded(!arrivalExpanded)}
            style={styles.serviceHeaderContainer}>
            <FontText style={styles.serviceHeader}>도착지 제공 서비스</FontText>
            <MIcon
              name={
                arrivalExpanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'
              }
              size={24}
              color="#000000"
              style={styles.arrow}
            />
          </TouchableOpacity>
          {arrivalExpanded && (
            <View style={styles.serviceItemContainer}>
              {arrivalAirportService.map(item => (
                <ServiceItem
                  key={item.id.toString()}
                  id={item.id}
                  name={item.name}
                  isChecked={selectedArrivalServiceIds.includes(item.id)}
                  onSelect={onSelectArrival}
                />
              ))}
            </View>
          )}
          <View style={styles.divideLine} />
          <TouchableOpacity
            onPress={() => setAirlineExpanded(!airlineExpanded)}
            style={styles.serviceHeaderContainer}>
            <FontText style={styles.serviceHeader}>항공사 제공 서비스</FontText>
            <MIcon
              name={
                airlineExpanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'
              }
              size={24}
              color="#000000"
              style={styles.arrow}
            />
          </TouchableOpacity>
          {airlineExpanded && (
            <View style={styles.serviceItemContainer}>
              {airlineService.map(item => (
                <ServiceItem
                  key={item.id.toString()}
                  id={item.id}
                  name={item.name}
                  isChecked={selectedAirlineServiceIds.includes(item.id)}
                  onSelect={onSelectAirline}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <SignButton isValid={true} buttonText="다음" onPress={onPress} />
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
  scrollView: {
    flex: 0.9,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  dateDisplayContainer: {
    marginTop: 25,
  },
  headerText: {
    marginTop: 24,
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 34,
  },
  airSummary: {
    marginTop: 28,
    padding: 26,

    minHeight: 126,

    borderRadius: 12,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
  },
  airports: {
    marginTop: 4,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airportText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
  },
  aircraft: {
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
  serviceContainer: {
    marginTop: 33,
  },
  serviceHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  serviceHeader: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
  },
  arrow: {
    marginLeft: 30,
  },
  serviceItemContainer: {
    marginTop: 14,
    paddingHorizontal: 25,
  },
  divideLine: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  footer: {
    flex: 0.1,

    marginBottom: 34,
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
  },
});
