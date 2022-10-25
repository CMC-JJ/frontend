import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

type ArrowBackProps = {
  size: number;
};

export function ArrowBack({size}: ArrowBackProps) {
  const navigation = useNavigation();

  return (
    <Icon
      name="arrowleft"
      size={size}
      color="black"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
}
