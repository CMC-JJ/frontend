import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontText} from './FontText';

type AirportItemProps = {
  id: number;
  name: string;
  onSelect: (id: number) => void;
};

export function AirportItem({id, name, onSelect}: AirportItemProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(id);
      }}
      style={styles.airportContainer}>
      <View style={styles.airportTextContainer}>
        <FontText style={styles.airportText}>{name}</FontText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  airportContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  airportTextContainer: {
    paddingHorizontal: 25,
  },
  airportText: {
    fontSize: 17,
    lineHeight: 25,
  },
});
