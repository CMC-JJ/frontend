// import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';

type RootStackParamList = {
  MainTab: undefined;
  SignIn: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //   const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View>
      <Text>RootStack</Text>
    </View>
  );
}

export default RootStack;
