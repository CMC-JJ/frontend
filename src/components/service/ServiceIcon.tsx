import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontText from '../FontText';
import {IArirlineLists} from '@/screens';
// import 'react-focus-rings/src/styles.css';
//{result}: IArirlineLists[]
export default function ServiceIcon({result}: any) {
  // const airlineList = useMemo(() => {
  //   result !== undefined &&
  //     result.map((v: any) => (
  //       <View style={styles.airlineList}>
  //         <TouchableOpacity style={styles.circle}></TouchableOpacity>
  //         <FontText style={styles.name}>{v.name}</FontText>
  //       </View>
  //     ));
  // }, [result]);
  const [data, setData] = useState<IArirlineLists[]>();
  useEffect(() => {
    setData(result);
    // console.log(result);
  }, [result]);
  const onToggle = (v: any) => {
    setData(
      data?.map((elem: any) => {
        if (elem.id === v.id) {
          if (elem.onClick === false) {
            elem.onClick = true;
            return elem;
          }
        } else {
          elem.onClick = false;
          return elem;
        }
      }),
    );
  };
  useEffect(() => {
    console.log('data', data);
  }, [data]);
  return (
    <View style={styles.container}>
      {data &&
        data.map((v: any) => (
          <View style={styles.airlineList} key={v.id}>
            <TouchableOpacity
              onPress={() => onToggle(v)}
              style={[styles.circle, v.onClick && styles.activeIcon]}>
              <Image source={{uri: v.logoImageUrl}} style={styles.image} />
            </TouchableOpacity>
            <FontText style={[styles.name, v.onClick && styles.activeText]}>
              {v.name}
            </FontText>
          </View>
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
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
