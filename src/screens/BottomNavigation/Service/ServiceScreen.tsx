import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontText from '@/components/FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAuthStore} from '@/store';
import {request} from '@/utils/api';
import ServiceIcon from '@/components/service/ServiceIcon';
export interface IArirlineLists {
  id: Number;
  name: String;
  logoImageUrl: String;
  onClick: Boolean;
}
export function ServiceScreen() {
  const {auth} = useAuthStore();
  const [airlineLists, setAirlineLists] = useState<IArirlineLists[]>();
  const [currentTab, setCurrentTab] = useState<'airline' | 'airport'>(
    'airline',
  );
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

  const airpostList = async () => {
    try {
      const res = await request('web/airlines', {}, 'GET', auth.jwtToken);
      // setAirlineLists.apply(
      //   {state: false},
      //   {...res.result.airlines.map((v: any) => v)},
      // );
      // setAirlineLists(res.result.airlines);
      setAirlineLists(
        res.result.airlines.map((v: any) => ({...v, ...{onClick: false}})),
      );
    } catch (e) {
      console.log('error', e);
    }
  };
  useEffect(() => {
    airpostList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(airlineLists);
  }, [airlineLists]);
  const isCurrentRegisteredTabActive = currentTab === 'airline';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <FontText style={styles.title}>항공서비스</FontText>
        <Icon style={styles.icon} name="search1" size={18} color="gray" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // style={[styles.button]}
          onPress={() => {
            setCurrentTab('airline');
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
          // style={/[styles.button]}
          onPress={() => {
            setCurrentTab('airport');
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

      <View style={styleBody.icon}>
        <ServiceIcon result={airlineLists} />
      </View>
      {/* <Button title={'버튼'} onPress={() => airpostList()} /> */}
    </SafeAreaView>
  );
}
const styleBody = StyleSheet.create({
  icon: {
    marginTop: 26,
  },
});
const styles = StyleSheet.create({
  container: {
    padding: 25,
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
    justifyContent: 'center',
  },
  allShowText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
  },
});
