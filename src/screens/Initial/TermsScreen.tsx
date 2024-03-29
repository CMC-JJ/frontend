import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack, FontText} from '@/components';
import {RootStackParamList} from '@/screens';
type TermsCompleteRouteProp = RouteProp<RootStackParamList, 'Terms'>;
export function TermsScreen() {
  const {params} = useRoute<TermsCompleteRouteProp>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <ScrollView>
        <View style={styles.body}>
          <FontText style={styles.title}>{params.title}</FontText>
          <FontText style={styles.text}>{params.text}</FontText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 25,
    // marginTop: 10,
  },
  body: {
    paddingHorizontal: 25,
    marginBottom: 100,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 28,
    color: 'black',
  },
  text: {
    color: '#121212',
    lineHeight: 20,
  },
  back: {
    marginBottom: 37,
    paddingHorizontal: 25,
    marginTop: 10,
  },
});
