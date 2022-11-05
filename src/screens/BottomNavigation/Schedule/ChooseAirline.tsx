import {ArrowBack} from '@/components';
import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export function ChooseAirline() {
  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
});
