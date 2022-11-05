import {AirportItem, ArrowBack, DateDisplay, SignButton} from '@/components';
import {FontText} from '@/components';
import {useAuthStore, useScheduleStore} from '@/store';
import {request} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import type {ScheduleNavigationProp} from './ScheduleStack';

const AIRPORT = [
  '인덱스용 데이터',
  '김포공항',
  '김해공항',
  '제주공항',
  '대구공항',
  '여수공항',
  '포항경주공항',
  '양양공항',
  '원주공항',
  '청주공항',
  '군산공항',
  '울산공항',
  '사천공항',
  '무안공항',
];

// const AIRLINE = [
//   '인덱스용 데이터',
//   '아시아나항공',
//   '대한항공',
//   '제주항공',
//   '하이에어',
//   '진에어',
//   '에어서울',
//   '에어부산',
//   '에어프레미아',
//   '티웨이항공',
//   '에어로케이',
// ];

type Airport = {
  id: number;
  name: string;
  region: string;
};
type AirportData = Airport[];
type Direction = 'departure' | 'arrival';

export function ScheduleAirService() {
  const {schedule, setSchedule} = useScheduleStore();
  const {auth} = useAuthStore();
  const navigation = useNavigation<ScheduleNavigationProp>();
  const [airportData, setAirportData] = useState<AirportData>([]);
  // const [number, setNumber] = useState<number>(0);

  console.log(schedule);

  useEffect(() => {
    (async () => {
      const result = await request('web/airports', {}, 'GET', auth.jwtToken);

      setAirportData(result.result.airports);
    })();
  }, [auth.jwtToken]);

  const [toggleAirPortModal, setToggleAirportModal] = useState<boolean>(false);

  const [currentDirection, setCurrentDirection] =
    useState<Direction>('departure');

  const onSelect = (id: number) => {
    if (currentDirection === 'departure') {
      setSchedule('departureAirportId', id);
    } else {
      setSchedule('arrivalAirportId', id);
    }
  };

  const onToggle = () => {
    setToggleAirportModal(toggleAirPortModal ? false : true);
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
          {'이용하실 공항과 항공사를\n선택해주세요'}
        </FontText>
        <FontText style={styles.guidMessage}>
          {'선택하신 곳에서 이용하실 수 있는\n교통약자 서비스를 알려드립니다.'}
        </FontText>
        <View style={styles.airportSelection}>
          <TouchableOpacity
            onPress={() => {
              setCurrentDirection('departure');
              onToggle();
            }}>
            <View style={styles.airport}>
              <FontText style={styles.airportHeader}>출발</FontText>
              <FontText style={styles.airportText}>
                {schedule.departureAirportId === 0
                  ? '선택하기'
                  : AIRPORT[schedule.departureAirportId]}
              </FontText>
            </View>
          </TouchableOpacity>
          <View style={styles.divideLine} />
          <TouchableOpacity
            onPress={() => {
              setCurrentDirection('arrival');
              onToggle();
            }}>
            <View style={styles.airport}>
              <FontText style={styles.airportHeader}>도착</FontText>
              <FontText style={styles.airportText}>
                {schedule.arrivalAirportId === 0
                  ? '선택하기'
                  : AIRPORT[schedule.arrivalAirportId]}
              </FontText>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.airlineSelection}
          onPress={() => {
            navigation.navigate('ChooseAirline');
          }}>
          {schedule.airlineId === 0 ? (
            <>
              <Icon name="aircraft-take-off" size={20} color="#000" />
              <FontText style={styles.airlineText}>항공사 선택하기</FontText>
            </>
          ) : (
            <FontText>hi</FontText>
          )}
        </TouchableOpacity>
        {toggleAirPortModal && (
          <Modal animationType="slide">
            <SafeAreaView>
              <View style={styles.modalBar} />
              <View style={styles.modalContainer}>
                <FlatList
                  ItemSeparatorComponent={() => (
                    <View style={styles.modalDivideLine} />
                  )}
                  data={airportData}
                  renderItem={({item}) => (
                    <AirportItem
                      id={item.id}
                      name={item.name}
                      onSelect={(id: number) => {
                        onSelect(id);
                        onToggle();
                      }}
                    />
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            </SafeAreaView>
          </Modal>
        )}
        <View style={styles.footer}>
          <SignButton
            isValid={
              schedule.arrivalAirportId !== 0 &&
              schedule.departureAirportId !== 0 &&
              schedule.airlineId !== 0
            }
            buttonText="다음"
            onPress={() => {
              // navigation.navigate('AirService');
            }}
          />
        </View>
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
  guidMessage: {
    marginTop: 12,

    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
  },
  airportSelection: {
    marginTop: 37,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    borderRadius: 12,
    backgroundColor: 'white',

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,

    elevation: 4,
    shadowColor: '#000000',
  },
  airlineSelection: {
    marginTop: 20,

    height: 66,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 12,
    backgroundColor: 'white',

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,

    elevation: 2,
    shadowColor: '#000000',
  },
  airlineText: {
    fontWeight: '600',
    marginLeft: 15,
    fontSize: 15,
    lineHeight: 23,
  },
  airport: {
    height: 130,

    alignItems: 'center',
    justifyContent: 'center',
  },
  airportHeader: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 23,

    color: '#7C7C7C',
  },
  airportText: {
    marginTop: 17,

    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
    color: '#000000',
  },
  divideLine: {
    width: 1,
    height: 77,
    backgroundColor: '#DEDEDE',
  },
  footer: {
    flex: 1,

    marginBottom: 34,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  modalBar: {
    width: 96,
    height: 5,

    marginTop: 15,
    alignSelf: 'center',

    backgroundColor: '#D9D9D9',
    borderRadius: 42,
  },
  airportContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  airportTextContainer: {
    paddingHorizontal: 25,
  },
  modalText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 25,
  },
  modalDivideLine: {
    height: 1,
    backgroundColor: '#DEDEDE',
  },
});
