import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import React from 'react';
import OctIcon from 'react-native-vector-icons/Octicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import {HomeScreen, ScheduleStack, MyPageStack, ServiceStack} from '@/screens';
import type {
  RootStackNavigationProp,
  ScheduleStackParamList,
  MypageStackParamList,
  ServiceStackParamList,
} from '@/screens';

type MainTabParamList = {
  Home: undefined;
  Service: ServiceStackParamList;
  Schedule: ScheduleStackParamList;
  MyPage: MypageStackParamList;
};

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;

export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#D9D9D9',
        tabBarLabelStyle: {
          position: 'relative',
          top: Platform.OS === 'ios' ? -5 : 0,
        },
        tabBarStyle: [
          {
            position: 'absolute',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: {width: 0, height: -3},
            shadowOpacity: 0.5,
            elevation: 10,
          },
          Platform.OS === 'ios' && {height: 96},
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({color = '#D9D9D9', size}) => (
            <OctIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Service"
        component={ServiceStack}
        options={{
          title: '항공서비스',
          tabBarIcon: ({color, size}) => (
            <IonIcon
              name="airplane-outline"
              size={size}
              color={color}
              style={{transform: [{rotateZ: '-20deg'}]}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleStack}
        options={{
          title: '일정',
          tabBarIcon: ({color, size}) => (
            <FontIcon name="calendar-check-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          title: '마이페이지',
          tabBarIcon: ({color, size}) => (
            <IonIcon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
