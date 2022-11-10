import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {checkMultiplePermissions} from './hooks/CheckPermission';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    checkMultiplePermissions();
  }, []);
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
// const styles = StyleSheet.create({});
