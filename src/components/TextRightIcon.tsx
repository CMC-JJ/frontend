import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ThinBar} from './BarSeparator';
import Icon from 'react-native-vector-icons/AntDesign';
import FontText from './FontText';
export default function TextRightIcon({
  text,
  onPress,
  isBar,
}: {
  text: string;
  onPress: () => void;
  isBar?: boolean;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.cardForm}>
        <TouchableOpacity
          onPress={onPress}
          hitSlop={{top: 15, bottom: 15}}
          style={styles.body}>
          <FontText
            style={[
              styles.text,
              Platform.OS === 'android' && {fontWeight: '700'},
            ]}>
            {text}
          </FontText>
          <Icon name="right" color={'black'} size={20} />
        </TouchableOpacity>
      </View>
      {isBar && <ThinBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  cardForm: {
    height: 70,
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
