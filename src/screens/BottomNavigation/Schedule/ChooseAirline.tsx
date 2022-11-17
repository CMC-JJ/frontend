import {ArrowBack, FontText} from '@/components';
import {useAuthStore, useScheduleStore} from '@/store';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {request} from '@/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {ScheduleNavigationProp} from './ScheduleStack';

type Airline = {
  id: number;
  name: string;
  logoImageUrl: string;
};

type AirlineData = Airline[];

export function ChooseAirline() {
  const navigation = useNavigation<ScheduleNavigationProp>();
  const {schedule, setSchedule} = useScheduleStore();
  const [airlineData, setAirlineData] = useState<AirlineData>([]);
  const {auth} = useAuthStore();

  useEffect(() => {
    (async () => {
      const result = await request('web/airlines', {}, 'GET', auth.jwtToken);

      setAirlineData(result.result.airlines);
    })();
  }, [auth.jwtToken]);

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <View style={styles.headerContainer}>
        <FontText style={styles.header}>{'항공사를 선택해주세요'}</FontText>
      </View>
      <View style={styles.airlineContainer}>
        {airlineData.map((airline, i) => (
          <View key={airline.id} style={styles.airlineWrapper}>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
                navigation.goBack();
                setSchedule('airlineId', airline.id);
              }}>
              <View
                style={[
                  styles.logoContainer,
                  airline.id === schedule.airlineId &&
                    styles.selectedLogoContainer,
                  i === 4 && {backgroundColor: '#C1D72E'},
                  ,
                ]}>
                <Image
                  source={{uri: airline.logoImageUrl}}
                  style={styles.logo}
                />
              </View>
              <FontText style={styles.logoText} numberOfLines={1}>
                {airline.name}
              </FontText>
            </TouchableOpacity>
          </View>
        ))}
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
  headerContainer: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  header: {
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 34,
  },
  airlineContainer: {
    marginTop: 30,
    paddingHorizontal: 25,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  airlineWrapper: {
    width: '33.3333%',
  },
  itemContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 68,
    height: 68,

    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 12,
  },
  selectedLogoContainer: {
    shadowColor: '#0066FF',
    shadowOpacity: 0.8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    marginTop: 23,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,

    marginLeft: -4,
  },
});
