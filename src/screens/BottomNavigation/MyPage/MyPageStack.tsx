import React from 'react';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  DeleteConfirmScreen,
  DeleteScreen,
  InfoDetailScreen,
  InfoModifyScreen,
  ModifyConfirmPassword,
  ModifyPasswordScreen,
  MyPageScreen,
  OwnReviewScreen,
  QuestionScreen,
  TermMypageScreen,
} from '@/screens';
import type {MainTabNavigationProp} from '@/screens';
import {Auth} from '@/store/useAuthStore';

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
  ModifyPassword: {
    auth: Auth;
  };
  ModifyConfirmPassword: {
    auth: Auth;
  };
  OwnReview: {
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
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={MyPageScreen} />
      <Stack.Screen name="InfoDetail" component={InfoDetailScreen} />
      <Stack.Screen name="Delete" component={DeleteScreen} />
      <Stack.Screen name="DeleteConfirm" component={DeleteConfirmScreen} />
      <Stack.Screen name="InfoModify" component={InfoModifyScreen} />
      <Stack.Screen name="ModifyPassword" component={ModifyPasswordScreen} />
      <Stack.Screen
        name="ModifyConfirmPassword"
        component={ModifyConfirmPassword}
      />
      <Stack.Screen name="TermMyPage" component={TermMypageScreen} />
      <Stack.Screen name="Question" component={QuestionScreen} />
      <Stack.Screen name="OwnReview" component={OwnReviewScreen} />
    </Stack.Navigator>
  );
}
