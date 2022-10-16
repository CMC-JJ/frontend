import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ArrowBackProps = {
  size: number;
};

export function ArrowBack({size}: ArrowBackProps) {
  const navigation = useNavigation();

  return (
    <Icon
      name="arrow-back"
      size={size}
      color="black"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
}
