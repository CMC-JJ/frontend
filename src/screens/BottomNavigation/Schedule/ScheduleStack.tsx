import React from 'react';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ScheduleTitle,
  ScheduleDate,
  ScheduleScreen,
  ScheduleAirService,
  ChooseAirline,
  ScheduleTime,
  ScheduleConvenience,
  ScheduleComplete,
  ScheduleDetail,
} from '@/screens';
import type {MainTabNavigationProp} from '@/screens';

export type ScheduleStackParamList = {
  ScheduleScreen: undefined;
  Title: undefined;
  Date: undefined;
  AirService: undefined;
  Time: undefined;
  ChooseAirline: undefined;
  Convenience: undefined;
  Complete: undefined;
  ScheduleDetail: {
    scheduleId: number;
  };
};

export type ScheduleNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  NativeStackNavigationProp<ScheduleStackParamList>
>;

const Stack = createNativeStackNavigator<ScheduleStackParamList>();

export function ScheduleStack() {
  return (
    <Stack.Navigator
      initialRouteName="ScheduleScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <Stack.Screen name="Title" component={ScheduleTitle} />
      <Stack.Screen name="Date" component={ScheduleDate} />
      <Stack.Screen name="AirService" component={ScheduleAirService} />
      <Stack.Screen name="ChooseAirline" component={ChooseAirline} />
      <Stack.Screen name="Time" component={ScheduleTime} />
      <Stack.Screen name="Convenience" component={ScheduleConvenience} />
      <Stack.Screen name="Complete" component={ScheduleComplete} />
      <Stack.Screen name="ScheduleDetail" component={ScheduleDetail} />
    </Stack.Navigator>
  );
}
