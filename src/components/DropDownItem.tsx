import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {FontText} from './FontText';

export default function DropDownItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [isShow, setIsShow] = useState<boolean>();

  const toggleListItem = () => {
    setIsShow(!isShow);
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="white"
        onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>
          <FontText style={styles.title}>{title}</FontText>
          {isShow ? (
            <Icon name="up" color="black" size={20} />
          ) : (
            <Icon name="down" color="black" size={20} />
          )}
        </View>
      </TouchableHighlight>
      {isShow && (
        <View style={styles.textContainer}>
          <FontText style={styles.text}>{text}</FontText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 13,
    paddingHorizontal: 25,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {fontSize: 15, fontWeight: '500', lineHeight: 28},
  textContainer: {marginTop: 15},
  text: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '300',
  },
});
