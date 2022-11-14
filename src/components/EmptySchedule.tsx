import type {ScheduleNavigationProp} from '@/screens';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {FontText} from './FontText';

type EmptyScheduleProps = {
  firstText: string;
  secondText: string;
};

export function EmptySchedule({firstText, secondText}: EmptyScheduleProps) {
  const navigation = useNavigation<ScheduleNavigationProp>();

  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.addScheduleLogo}
          source={require('@/assets/images/addSchedule.png')}
        />
        <View style={styles.announcementMessage}>
          <FontText style={styles.message}>{firstText}</FontText>
          <FontText style={styles.message}>{secondText}</FontText>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addSchedule}
        onPress={() => {
          navigation.navigate('Title');
        }}>
        <FontText style={styles.addText}>일정 추가하기</FontText>
        <Icon name="chevron-right" color="#0066FF" size={20} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,

    justifyContent: 'center',
    alignItems: 'center',
  },
  addScheduleLogo: {
    width: 94,
    height: 82,
  },
  announcementMessage: {
    marginTop: 33,
    alignItems: 'center',
  },
  message: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,

    color: '#000000',
  },
  addSchedule: {
    flexDirection: 'row',
    marginTop: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    marginRight: 2,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: '#0066FF',
  },
});
