import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   checkMultiplePermissions();
  // }, []);

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    } catch (e) {
      console.warn('에러발생');
      console.warn(e);
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaProvider>
          <RootStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default App;
