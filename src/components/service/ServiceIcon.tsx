import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AirServiceProps} from '@/screens';
import {clickState} from '@/utils/clickUtils';
import AirportIcon from '@/components/service/CircleTextIcon';
import {useAuthStore} from '@/store';
import {request} from '@/utils/api';
import {AirlinesDetailProps} from './ServiceCard';

export default function ServiceIcon({
  list,
  setCurrentClicked,
}: {
  list: AirServiceProps[] | undefined;
  setCurrentClicked: React.Dispatch<
    React.SetStateAction<AirlinesDetailProps | undefined>
  >;
}) {
  // const airlineList = useMemo(() => {
  //   result !== undefined &&
  //     result.map((v: any) => (
  //       <View style={styles.airlineList}>
  //         <TouchableOpacity style={styles.circle}></TouchableOpacity>
  //         <FontText style={styles.name}>{v.name}</FontText>
  //       </View>
  //     ));
  // }, [result]);
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
      // setCurrentClicked(res.result.airport);
      setCurrentClicked({...res.result.airport, ...{image: v.logoImageUrl}});
    } catch (e) {
      console.log('항공사 서비스 리스트 조회 오류', e);
    }
  };
  //아이콘 클릭 함수
  const onToggleAirports = (v: AirServiceProps) => {
    setData(clickState(v, data));

    airportsDetail(v);
  };

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {data &&
        data.map((v: any) => (
          <View style={styles.airlineList} key={v.id}>
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
