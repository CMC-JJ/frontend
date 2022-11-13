import {View, SafeAreaView, Platform, StyleSheet} from 'react-native';
import React from 'react';
import {ArrowBack} from '@/components';
import {FontText} from '@/components/FontText';
import TextRightIcon from '@/components/TextRightIcon';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {MypageNavigationProp} from '@/screens';
import {data} from '@/assets/texts/TermsText';
import {useHideTabBar} from '@/hooks/useVisibleTabBar';

export function TermMypageScreen() {
  const navigation = useNavigation<MypageNavigationProp>();
  useFocusEffect(useHideTabBar(navigation));
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <View style={styles.back}>
          {Platform.OS === 'ios' && <ArrowBack size={28} />}
        </View>
        <View>
          <FontText
            style={[
              styles.headerTitle,
              Platform.OS === 'android' && {fontWeight: '700'},
            ]}>
            약관 및 동의관리
          </FontText>
        </View>
      </View>
      <View style={styles.listContainer}>
        <TextRightIcon
          text={'개인정보 수집 이용 동의'}
          onPress={() => {
            navigation.navigate('Terms', {
              title: data[3].title,
              text: data[3].text,
            });
          }}
          isBar
        />
        <TextRightIcon
          text={'개인정보 처리 방침'}
          onPress={() => {
            navigation.navigate('Terms', {
              title: data[2].title,
              text: data[2].text,
            });
          }}
          isBar
        />
        <TextRightIcon
          text={'가치가자 서비스 이용약관'}
          onPress={() => {
            navigation.navigate('Terms', {
              title: data[0].title,
              text: data[0].text,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 5,
    paddingTop: 5,
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  listContainer: {
    marginTop: 45,
  },
});
