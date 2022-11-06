import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  SignInScreen,
  FindIdScreen,
  FindPasswordScreen,
  SignUpScreen,
  SignUpPhoneAuth,
  SignUpNickName,
  SignUpComplete,
  MainTab,
  FindIdComplete,
  FindPasswordComplete,
  PermissionScreen,
  OnboardingScreen,
  StartScreen,
  TermsScreen,
} from '@/screens';
import type {MainTabNavigationScreenParams} from '@/screens';

export type RootStackParamList = {
  Permission: undefined;
  OnBoarding: undefined;
  Start: undefined;
  Terms: {
    title: string;
    text: string;
  };
  SignIn: undefined;
  FindId: undefined;
  FindIdComplete: {
    userName: string;
    createdAt: string;
  };
  FindPassword: undefined;
  FindPasswordComplete: {
    userId: number;
  };
  PhoneAuth: undefined;
  SignUp: undefined;
  NickName: undefined;
  SignUpComplete: undefined;
  MainTab: MainTabNavigationScreenParams;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //   const navigation = useNavigation<RootStackNavigationProp>();

  // TODO: 유저의 정보가 있으면 Stack에서 필요없는 screen 제거!

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Permission" component={PermissionScreen} />
      <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="FindId" component={FindIdScreen} />
      <Stack.Screen name="FindIdComplete" component={FindIdComplete} />
      <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
      <Stack.Screen
        name="FindPasswordComplete"
        component={FindPasswordComplete}
      />
      <Stack.Screen name="PhoneAuth" component={SignUpPhoneAuth} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="NickName" component={SignUpNickName} />
      <Stack.Screen name="SignUpComplete" component={SignUpComplete} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
}

export default RootStack;
