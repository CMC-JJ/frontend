import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AirServiceProps} from '@/screens';
import {clickState} from '@/utils/clickUtils';
import AirportIcon from '@/components/service/CircleTextIcon';

export default function ServiceIcon({
  list,
  setCurrentClicked,
}: {
  list: AirServiceProps[] | undefined;
  setCurrentClicked: React.Dispatch<
    React.SetStateAction<AirServiceProps | undefined>
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

  useEffect(() => {
    setData(list);
  }, [list]);

  //아이콘 클릭 함수
  const onToggle = (v: AirServiceProps) => {
    setData(clickState(v, data));
    setCurrentClicked(v);
  };
  // useEffect(() => {
  //   console.log('data', data);
  // }, [data]);
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
              onPress={() => onToggle(v)}
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
  circle: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
  },
  name: {marginTop: 13, fontWeight: '500', fontSize: 15, color: '#979797'},
  image: {
    width: 58,
    height: 58,
    resizeMode: 'cover',
  },
  activeIcon: {
    shadowColor: '#0066FF',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
  },
  activeText: {fontWeight: '600', fontSize: 15, color: 'black'},
});
