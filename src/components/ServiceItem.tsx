import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Platform, StyleSheet, View} from 'react-native';
import {FontText} from './FontText';

type ServiceItemProps = {
  id: number;
  name: string;
  isChecked: boolean;
  onSelect: (id: number) => void;
};

export function ServiceItem({id, name, isChecked, onSelect}: ServiceItemProps) {
  return (
    <View style={styles.rowContainer}>
      {/* 체크박스 */}
      {Platform.OS === 'ios' ? (
        <CheckBox
          value={isChecked}
          onValueChange={() => {
            onSelect(id);
          }}
          boxType="square"
          onTintColor="#BCBCBC"
          onFillColor="#0066ff"
          onCheckColor="#FFF9F9"
          lineWidth={2}
          onAnimationType="fade"
          offAnimationType="fade"
          style={{
            width: 16,
            height: 16,
            marginRight: 8,
          }}
        />
      ) : (
        <CheckBox
          value={isChecked}
          onValueChange={() => {
            onSelect(id);
          }}
          boxType="square"
          tintColors={{
            true: '#0066ff',
            false: '#BCBCBC',
          }}
          style={{
            marginLeft: -7,
          }}
        />
      )}
      {/* <TouchableOpacity style={styles.serviceItemContainer}> */}
      <FontText style={styles.serviceItemText}>{name}</FontText>
      {/* </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 10,

    alignItems: 'center',
  },
  serviceItemContainer: {},
  serviceItemText: {
    marginLeft: 8,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
  },
});
