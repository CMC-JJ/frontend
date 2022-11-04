import {useScheduleStore} from '@/store';
import React from 'react';
import {Text, View} from 'react-native';

export function Date() {
  const {schedule} = useScheduleStore();

  console.log(schedule);

  return (
    <View>
      <Text>hi</Text>
    </View>
  );
}
