import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import {useAuthStore} from './store';
import AsyncStorage from '@react-native-community/async-storage';
const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   checkMultiplePermissions();
  // }, []);
  const {setAuth} = useAuthStore();
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    } catch (e) {
      console.warn(e);
    }
  });

  useEffect(() => {
    try {
      const load = async () => {
        const value = await AsyncStorage.getItem('user');
        value === null ? '' : setAuth(JSON.parse(value).user);
      };
      load();
    } catch {}
  }, [setAuth]);
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
