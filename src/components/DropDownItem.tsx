import {Animated, StyleSheet, TouchableHighlight, View} from 'react-native';
import React, {useRef, useState} from 'react';
import FontText from './FontText';
import Icon from 'react-native-vector-icons/AntDesign';

export default function DropDownItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [isShow, setIsShow] = useState<boolean>();
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleListItem = () => {
    const config = {
      duraiton: 100,
      toValue: isShow ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    setIsShow(!isShow);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="white"
        onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>
          <FontText style={styles.title}>{title}</FontText>
          <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
            <Icon name="down" color="black" size={20} />
          </Animated.View>
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
