import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {InfoDetailCompleteRouteProp} from './MyPageScreen';
import {useRoute} from '@react-navigation/native';

export default function DeleteScreen() {
  const {params} = useRoute<InfoDetailCompleteRouteProp>();
  console.log(params);
  return (
    <View style={styles.fill}>
      <Text>DeleteScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({fill: {}});
