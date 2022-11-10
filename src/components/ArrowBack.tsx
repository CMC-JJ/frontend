import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

type ArrowBackProps = {
  size: number;
  color?: string;
};

export function ArrowBack({size, color = 'black'}: ArrowBackProps) {
  const navigation = useNavigation();

  return (
    <Icon
      name="arrowleft"
      size={size}
      color={color}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
}
