import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontText from '../FontText';

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
  return (
    <View style={styles.container}>
      {/* <View style={styles.airlineList}>
        <TouchableOpacity style={styles.circle}></TouchableOpacity>
        <FontText style={styles.name}>대한항공</FontText>
      </View> */}
      {result &&
        result.map((v: any) => (
          <View style={styles.airlineList} key={v.id}>
            <TouchableOpacity style={styles.circle}>
              <Image
                // source={require(`${v.logoImageUrl}`)}
                source={{uri: v.logoImageUrl}}
                resizeMode="contain"
                style={{
                  width: 58,
                  height: 58,
                }}
              />
            </TouchableOpacity>
            <FontText style={styles.name}>{v.name}</FontText>
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
    marginRight: 14,
  },
  circle: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {marginTop: 13, fontWeight: '500', fontSize: 15},
});
