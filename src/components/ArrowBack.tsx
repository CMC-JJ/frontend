import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type ArrowBackProps = {
  size: number;
  color?: string;
};

export function ArrowBack({size, color = 'black'}: ArrowBackProps) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="arrowleft" size={size} color={color} />
    </Pressable>
  );
}
