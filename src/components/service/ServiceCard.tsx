import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import FontText from '../FontText';
import {AirServiceProps} from '@/screens';

export default function ServiceCard({
  data,
}: {
  data: AirServiceProps | undefined;
}) {
  useEffect(() => {
    console.log('ss', data);
  }, [data]);
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: data?.logoImageUrl,
          }}
          style={styles.image}
        />
        <FontText />
      </View>
      <View />
      <View />
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 314,
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
    elevation: 10,
  },
  image: {
    width: 33,
    height: 33,
  },
});
