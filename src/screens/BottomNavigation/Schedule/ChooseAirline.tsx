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

// TODO: 데이터 제대로 들어왔을때, 어떻게 되는지 확인!
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
        <FontText
          style={[
            styles.header,
            Platform.OS === 'android' && {fontWeight: '900'},
          ]}>
          {'항공사를 선택해주세요'}
        </FontText>
      </View>
      <View style={styles.airlineContainer}>
        {airlineData.map(airline => (
          <TouchableOpacity
            key={airline.id}
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
              ]}>
              <Image source={{uri: airline.logoImageUrl}} style={styles.logo} />
            </View>
            <FontText style={styles.logoText}>{airline.name}</FontText>
          </TouchableOpacity>
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

    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 8,
    backgroundColor: 'white',
  },
  selectedLogoContainer: {
    shadowColor: '#0066FF',
    shadowOpacity: 0.9,
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
  },
});
