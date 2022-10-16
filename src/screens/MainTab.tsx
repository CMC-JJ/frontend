import React from 'react';
import {Text, View} from 'react-native';
import {useAuthStore} from '../store';

export function MainTab() {
  const {auth} = useAuthStore();

  console.log(auth);

  return (
    <View>
      <Text>메인탭</Text>
    </View>
  );
}
