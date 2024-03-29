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
  // PermissionScreen,
  OnboardingScreen,
  StartScreen,
  TermsScreen,
  ScheduleDetail,
} from '@/screens';
import type {MainTabNavigationScreenParams} from '@/screens';
// import {usePermission} from '@/store';
import {useAuthStore} from '@/store';

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
  ScheduleDetail: {
    scheduleId: number;
  };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //   const navigation = useNavigation<RootStackNavigationProp>();

  // TODO: 유저의 정보가 있으면 Stack에서 필요없는 screen 제거!
  const {auth} = useAuthStore();

  return (
    <Stack.Navigator>
      {/* {!permissionAllow.allow && (
        <Stack.Screen
          name="Permission"
          component={PermissionScreen}
          options={{headerShown: false}}
        />
      )} */}
      {auth.userId === 0 ? (
        <>
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
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScheduleDetail"
            component={ScheduleDetail}
            options={{headerShown: false}}
          />
        </>
      )}
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
