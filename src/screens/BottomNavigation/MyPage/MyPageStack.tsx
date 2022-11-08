import React from 'react';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  InfoDetailScreen,
  MyPageScreen,
  QuestionScreen,
  TermMypageScreen,
} from '@/screens';
import type {MainTabNavigationProp} from '@/screens';
import {Auth} from '@/store/useAuthStore';
import DeleteScreen from './DeleteScreen';
import DeleteConfirmScreen from './DeleteConfirmScreen';
import InfoModifyScreen from './InfoModifyScreen';

export type MypageStackParamList = {
  Home: undefined;
  InfoDetail: {
    auth: Auth;
  };
  Question: undefined;
  TermMyPage: undefined;
  Delete: {
    auth: Auth;
  };
  DeleteConfirm: {
    userId: number;
    deleteId: number;
  };
  InfoModify: {
    auth: Auth;
  };
};

export type MypageNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  NativeStackNavigationProp<MypageStackParamList>
>;

const Stack = createNativeStackNavigator<MypageStackParamList>();

export function MyPageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MyPageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoDetail"
        component={InfoDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteConfirm"
        component={DeleteConfirmScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoModify"
        component={InfoModifyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermMyPage"
        component={TermMypageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
