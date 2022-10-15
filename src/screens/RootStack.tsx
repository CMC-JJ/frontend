import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {SignInScreen, FindIdScreen, FindPasswordScreen, SignUpScreen} from './';
import {PhoneAuthScreen} from './PhoneAuthScreen';

type RootStackParamList = {
  SignIn: undefined;
  FindId: undefined;
  FindPassword: undefined;
  PhoneAuth: undefined;
  SignUp: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //   const navigation = useNavigation<RootStackNavigationProp>();
  //   console.log(styles.test);
  //   console.log(styles.test2);

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
        name="FindPassword"
        component={FindPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuthScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
