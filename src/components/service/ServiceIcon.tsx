import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AirServiceProps} from '@/screens';
import {clickState} from '@/utils/clickUtils';
import AirportIcon from '@/components/service/CircleTextIcon';
import {useAuthStore} from '@/store';
import {request} from '@/utils/api';
import {AirDetailProps} from './ServiceCard';

export default function ServiceIcon({
  list,
  setCurrentClicked,
  isCurrentRegisteredTabActive,
}: {
  list: AirServiceProps[] | undefined;
  setCurrentClicked: React.Dispatch<
    React.SetStateAction<AirDetailProps | undefined>
  >;
  isCurrentRegisteredTabActive: boolean;
}) {
  const [data, setData] = useState<AirServiceProps[]>();
  const {auth} = useAuthStore();
  useEffect(() => {
    setData(list);
  }, [list]);
  const airportsDetail = async (v: any) => {
    try {
      const res = await request(
        `web/airports/${v.id}`,
        {},
        'GET',
        auth.jwtToken,
      );
      setCurrentClicked(res.result.airport);
    } catch (e) {
      console.log('airportlist 오류', e);
    }
  };
  const airlinesDetail = async (v: any) => {
    try {
      const res = await request(
        `web/airlines/${v.id}`,
        {},
        'GET',
        auth.jwtToken,
      );
      console.log(res);
      setCurrentClicked({...res.result.airline, ...{image: v.logoImageUrl}});
    } catch (e) {
      console.log('airlinelist 오류', e);
    }
  };
  //아이콘 클릭 함수
  const onToggleAirports = (v: AirServiceProps) => {
    setData(clickState(v, data));
    isCurrentRegisteredTabActive ? airportsDetail(v) : airlinesDetail(v);
  };
  // useEffect(() => {
  //   console.log('isCurrentRegisteredTabActive', isCurrentRegisteredTabActive);
  // }, [isCurrentRegisteredTabActive]);

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {data &&
        data.map((v: any) => (
          <View style={styles.airlineList} key={v.id}>
            {/* circle 이미지와 텍스트 set */}
            <AirportIcon
              name={v.name}
              logoImageUrl={v.logoImageUrl}
              onClick={v.onClick}
              onPress={() => onToggleAirports(v)}
              disabled={v.onClick}
            />
          </View>
        ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    left: -10,
    flexDirection: 'row',
  },
  airlineList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
  },

  name: {marginTop: 13, fontWeight: '500', fontSize: 15, color: '#979797'},
  image: {
    width: 58,
    height: 58,
    resizeMode: 'cover',
  },
});
