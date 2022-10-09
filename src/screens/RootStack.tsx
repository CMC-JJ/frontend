// import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type RootStackParamList = {
  MainTab: undefined;
  SignIn: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //   const navigation = useNavigation<RootStackNavigationProp>();
  //   console.log(styles.test);
  //   console.log(styles.test2);

  return (
    <View style={styles.block}>
      <Text style={styles.test}>안녕하세요 나는 줄리입니다.</Text>
      <Text style={styles.test2}>안녕하세요 나는 줄리입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 50,
  },
  test: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  test2: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});

export default RootStack;
