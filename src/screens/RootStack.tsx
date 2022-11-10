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
  AirSearchScreen,
  ReportScreen,
  TermMypageScreen,
  QuestionScreen,
} from '@/screens';
import type {MainTabNavigationScreenParams} from '@/screens';
import {Auth, usePermission} from '@/store';
// import OwnReviewScreen from './BottomNavigation/MyPage/OwnReviewScreen';

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
  SignUpComplete: undefined;
  NickName: undefined;
  MainTab: MainTabNavigationScreenParams;
  AirSearch: undefined;
  TermMyPage: undefined;
  Report: {
    id: number | undefined;
    type: string;
  };
  Question: undefined;
  OwnReview: {
    auth: Auth;
  };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //   const navigation = useNavigation<RootStackNavigationProp>();

  // TODO: 유저의 정보가 있으면 Stack에서 필요없는 screen 제거!

  const {permissionAllow} = usePermission();
  //permissionAllow = 모두허용되어있을 때 true

  return (
    <Stack.Navigator>
      {!permissionAllow.allow && (
        <Stack.Screen
          name="Permission"
          component={PermissionScreen}
          options={{headerShown: false}}
        />
      )}
      {/* 유저정보있으면 온보딩 제거 */}
      <Stack.Screen
        name="OnBoarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindId"
        component={FindIdScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindIdComplete"
        component={FindIdComplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindPasswordComplete"
        component={FindPasswordComplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneAuth"
        component={SignUpPhoneAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NickName"
        component={SignUpNickName}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpComplete"
        component={SignUpComplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AirSearch"
        component={AirSearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermMyPage"
        component={TermMypageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="OwnReview"
        component={OwnReviewScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
