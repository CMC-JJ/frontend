import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {AirServiceProps} from '@/screens';
import AirportIcon from '@/components/service/CircleTextIcon';

export default function ServiceIcon({
  list,
  menu,
  onMenuPress,
}: // setCurrentClicked,
// isCurrentRegisteredTabActive,
{
  list: AirServiceProps[] | undefined;
  menu: AirServiceProps | null;
  onMenuPress?: (menu: AirServiceProps) => void;
  // setCurrentClicked: React.Dispatch<
  //   React.SetStateAction<AirDetailProps | undefined>
  // >;
  // isCurrentRegisteredTabActive: boolean;
}) {
  // const [data, setData] = useState<AirServiceProps[]>();
  // const {auth} = useAuthStore();
  // useEffect(() => {
  //   setData(list);
  // }, [list]);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  //아이콘 클릭 함수
  // const onToggleAirports = (v: AirServiceProps) => {
  //   setData(clickState(v, data));
  //   isCurrentRegisteredTabActive ? airportsDetail(v) : airlinesDetail(v);
  // };
  // useEffect(() => {
  //   console.log('isCurrentRegisteredTabActive', isCurrentRegisteredTabActive);
  // }, [isCurrentRegisteredTabActive]);

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {list &&
        list.map((v: AirServiceProps) => (
          <View style={styles.airlineList} key={v.id}>
            {/* circle 이미지와 텍스트 set */}
            <AirportIcon
              name={v.name}
              logoImageUrl={v.logoImageUrl}
              isActived={menu?.name === v.name}
              disabled={menu?.name === v.name}
              onPress={() => onMenuPress?.(v)}
              // onPress={() => onToggleAirports(v)}
              region={v.region}
            />
          </View>
        ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    // paddingLeft: 10,
    // left: -10,
    // paddingTop: 20,
    // top: -20,
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
