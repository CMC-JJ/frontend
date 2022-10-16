import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
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
} from './';

export type RootStackParamList = {
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
  MainTab: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //   const navigation = useNavigation<RootStackNavigationProp>();

  // TODO: 유저의 정보가 있으면 Stack에서 필요없는 screen 제거!

  return (
    <Stack.Navigator>
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
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
