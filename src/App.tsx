import {NavigationContainer} from '@react-navigation/native';
// import React, {useState} from 'react';
// import Onboarding from './screens/OnBoarding';
import RootStack from './screens/RootStack';

function App() {
  // 앱권한 O, 자동로그인 X
  // 앱권한 O, 자동로그인 O
  // -> 로그인 화면
  // -> 홈 화면
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
