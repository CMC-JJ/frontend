import {} from 'react-native';
import React, {Component} from 'react';

import OnboardingScreen from './screens/OnBoardingScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class App extends Component {
  render() {
    return (
      <>
        <SafeAreaProvider>
          {/* <View> */}
          <OnboardingScreen />
          {/* <Test /> */}
          {/* </View> */}
        </SafeAreaProvider>
      </>
    );
  }
}

// const styles = StyleSheet.create({});
