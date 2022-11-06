import {formatDateText} from '@/utils';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FontText} from './FontText';

type DateDisplayProps = {
  startDate: string;
};

export function DateDisplay({startDate}: DateDisplayProps) {
  return (
    <View style={styles.dateDisplay}>
      <Image
        source={require('@/assets/images/calendar.png')}
        style={styles.imageSize}
      />
      <FontText style={styles.dateText}>
        {formatDateText(startDate.slice(0, 10)) || null}
      </FontText>
    </View>
  );
}

const styles = StyleSheet.create({
  dateDisplay: {
    width: 120,
    height: 32,

    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 5,

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,

    elevation: 2,
    shadowColor: '#000000',
    backgroundColor: 'white',
  },
  imageSize: {
    marginLeft: 15,

    width: 27,
    height: 27,
  },
  dateText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,

    color: '#0066FF',
  },
});
