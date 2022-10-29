import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';

function App() {
  // 앱권한 O, 자동로그인 X
  // 앱권한 O, 자동로그인 O
  // -> 로그인 화면
  // -> 홈 화면
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
export default App;
// const styles = StyleSheet.create({});
