import React from 'react';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AirSearchScreen, ReportScreen, ServiceScreen} from '@/screens';
import type {MainTabNavigationProp} from '@/screens';
export type ServiceStackParamList = {
  ServiceHome: undefined;
  AirSearch: undefined;
  Report: {
    id: number | undefined;
    type: string;
  };
};
export type ServiceNavgationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  NativeStackNavigationProp<ServiceStackParamList>
>;
const Stack = createNativeStackNavigator<ServiceStackParamList>();
export function ServiceStack() {
  return (
    <Stack.Navigator
      initialRouteName="ServiceHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServiceHome" component={ServiceScreen} />
      <Stack.Screen name="AirSearch" component={AirSearchScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}
