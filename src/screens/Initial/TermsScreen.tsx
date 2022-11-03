import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack} from '@/components';
import {RootStackParamList} from '@/screens';
import FontText from '@/components/FontText';
type FindIdCompleteRouteProp = RouteProp<RootStackParamList, 'Terms'>;
export function TermsScreen() {
  const {params} = useRoute<FindIdCompleteRouteProp>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <ScrollView>
        <FontText style={styles.title}>{params.title}</FontText>
        <FontText style={styles.text}>{params.text}</FontText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 28,
  },
  text: {
    overflow: 'scroll',
  },
  back: {
    marginBottom: 37,
  },
});