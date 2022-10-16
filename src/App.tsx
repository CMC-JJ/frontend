import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import React, {useState} from 'react';
// import Onboarding from './screens/OnBoarding';
// import RootStack from './screens/RootStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Permissions from './screens/Permissions';

function App() {
  // 앱권한 O, 자동로그인 X
  // 앱권한 O, 자동로그인 O
  // -> 로그인 화면
  // -> 홈 화면
  return (
    // <NavigationContainer>
    //   <RootStack />
    <SafeAreaProvider>
      <Permissions />
    </SafeAreaProvider>
    // </NavigationContainer>
  );
}

export default App;
