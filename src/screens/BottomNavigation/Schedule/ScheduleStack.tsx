import React from 'react';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DateScreen, ScheduleScreen} from '@/screens';
import type {MainTabNavigationProp} from '@/screens';

export type ScheduleStackParamList = {
  Home: undefined;
  Title: undefined;
  Date: undefined;
  AirService: undefined;
  Convenience: undefined;
  Complete: undefined;
};

export type ScheduleNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  NativeStackNavigationProp<ScheduleStackParamList>
>;

const Stack = createNativeStackNavigator<ScheduleStackParamList>();

export function ScheduleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ScheduleScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Title" component={Title} /> */}
      <Stack.Screen
        name="Date"
        component={DateScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="AirService" component={AirService} />
        <Stack.Screen name="Convenience" component={Convenience} />
        <Stack.Screen name="Complete" component={Complete} /> */}
    </Stack.Navigator>
  );
}
