import React, {ComponentProps, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontText from '@/components/FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAuthStore} from '@/store';
import {request} from '@/utils/api';
import ServiceIcon from '@/components/service/ServiceIcon';
import {
  AirlinesDetailProps,
  ServiceCard,
} from '@/components/service/ServiceCard';

export interface AirServiceProps
  extends ComponentProps<typeof TouchableOpacity> {
  id: number;
  name: string;
  logoImageUrl?: string;
  region?: string;
  onClick: boolean;
}
export function ServiceScreen() {
  const {auth} = useAuthStore();
  const [airlineLists, setAirlineLists] = useState<AirServiceProps[]>();
  const [airportLists, setAirportLists] = useState<AirServiceProps[]>();
  const [currentTab, setCurrentTab] = useState<'airport' | 'airline'>(
    'airport',
  );
  const [currentClicked, setCurrentClicked] = useState<AirlinesDetailProps>();
  // const airpostList = useCallback(() => {
  //   async () => {
  //     try {
  //       const res = await request('web/airlines', {}, 'GET', auth.jwtToken);
  //       setAirlineLists(res.result.airlines);
  //     } catch (e) {
  //       console.log('error', e);
  //     }
  //   };
  // }, [setAirlineLists, auth.jwtToken]);
  const fetchAirportLists = async () => {
    try {
      const res = await request('web/airports', {}, 'GET', auth.jwtToken);
      setAirportLists(
        res.result.airports.map((v: any) => ({...v, ...{onClick: false}})),
      );
    } catch (e) {
      console.log('error', e);
    }
  };
  const fetchAirlineLists = async () => {
    try {
      const res = await request('web/airlines', {}, 'GET', auth.jwtToken);
      setAirlineLists(
        res.result.airlines.map((v: any) => ({...v, ...{onClick: false}})),
      );
    } catch (e) {
      console.log('error', e);
    }
  };

  const isCurrentRegisteredTabActive = currentTab === 'airport';
  useEffect(() => {
    isCurrentRegisteredTabActive
      ? airportLists
        ? ''
        : fetchAirportLists()
      : airlineLists
      ? ''
      : fetchAirlineLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentRegisteredTabActive, []]);
  // useEffect(() => {
  //   console.log('currentClicked', currentClicked);
  // }, [currentClicked]);
  return (
    <SafeAreaView style={styles.fill}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <FontText style={styles.title}>항공서비스</FontText>
          <Icon style={styles.icon} name="search1" size={18} color="gray" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // style={[styles.button]}
            onPress={() => {
              setCurrentTab('airport');
            }}>
            <FontText
              style={[
                styles.tabText,
                isCurrentRegisteredTabActive && styles.activeText,
              ]}>
              공항
            </FontText>
          </TouchableOpacity>
          <View style={styles.bar} />
          <TouchableOpacity
            onPress={() => {
              setCurrentTab('airline');
            }}>
            <FontText
              style={[
                styles.tabText,
                !isCurrentRegisteredTabActive && styles.activeText,
              ]}>
              항공사
            </FontText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.allShow}>
            <FontText style={styles.allShowText}>전체보기</FontText>
          </TouchableOpacity>
        </View>

        {/* 아이콘&이름 */}
        <View style={styleBody.icon}>
          <ServiceIcon
            list={isCurrentRegisteredTabActive ? airportLists : airlineLists}
            setCurrentClicked={setCurrentClicked}
            isCurrentRegisteredTabActive={isCurrentRegisteredTabActive}
          />
        </View>
        <View style={styleBody.line} />
        {/* 서비스 상세정보 */}
        <View>
          <ServiceCard
            data={currentClicked}
            isCurrentRegisteredTabActive={isCurrentRegisteredTabActive}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styleBody = StyleSheet.create({
  icon: {
    marginTop: 26,
  },
  line: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginTop: 15,
    marginBottom: 25,
  },
});
const styles = StyleSheet.create({
  fill: {
    padding: 25,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  icon: {
    color: 'black',
  },
  tabText: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 23,
    color: '#979797',
  },
  activeText: {
    fontWeight: '600',
    color: '#0066FF',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  bar: {
    width: 2,
    height: 21,
    backgroundColor: '#DEDEDE',
    marginHorizontal: 13,
  },
  allShow: {
    width: 76,
    height: 26,
    borderRadius: 12,
    backgroundColor: 'black',
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  allShowText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
  },
});
