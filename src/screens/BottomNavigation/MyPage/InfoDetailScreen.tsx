import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export function InfoDetailScreen() {
  return (
    <SafeAreaView style={styles.fill}>
      <Text>InfoDetail</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
});
