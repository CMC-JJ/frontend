import {ArrowBack} from '@/components';
import {COLOR} from '@/constants';
import React, {type ReactNode} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type GeneralViewProps = {
  backgroundColor?: string;
  children: ReactNode;
};

/**
 * ArrowBack이 존재하는 기본적인 Layout View
 */
export function GeneralView({
  backgroundColor = COLOR['GC-50'],
  children,
}: GeneralViewProps) {
  return (
    <SafeAreaView style={[styles.fill, {backgroundColor}]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: COLOR['GC-50'],
  },
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
});
