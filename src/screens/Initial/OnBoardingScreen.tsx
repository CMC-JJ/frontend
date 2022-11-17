import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import SkipButton from '@/components/SkiptButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '@/screens';
import ImageText from '@/components/ImageText';
const image_1 = require('@/assets/images/onboarding/onboarding_1.png');
const image_2 = require('@/assets/images/onboarding/onboarding_2.png');
const image_3 = require('@/assets/images/onboarding/onboarding_3.png');
const image_4 = require('@/assets/images/onboarding/onboarding_4.png');
const Square = ({selected}: any) => {
  let backgroundColor;
  backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  return (
    <View
      style={[
        navBarStyle(backgroundColor).navBar,
        Platform.OS === 'ios' ? {bottom: hp('80%')} : {bottom: hp('85%')},
      ]}
    />
  );
};

export function OnboardingScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#0066FF" />
      <Onboarding
        transitionAnimationDuration={1000}
        showDone={true}
        DotComponent={Square}
        SkipButtonComponent={SkipButton}
        DoneButtonComponent={SkipButton}
        bottomBarHighlight={false}
        bottomBarHeight={50}
        showNext={false}
        onSkip={() => navigation.navigate('Start')}
        onDone={() => navigation.navigate('Start')}
        pages={[
          {
            title: '',
            subtitle: '',
            backgroundColor: '#0066FF',
            image: (
              <ImageText
                text={'오늘 비행기를 타고\n국내 여행을 떠나시나요?'}
                image={image_1}
                style={{width: 200, height: 330, marginTop: 30}}
              />
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: '#0066FF',
            image: (
              <View>
                <ImageText
                  text={'친구들을 등록해서\n서로의 위치를 확인할 수 있어요.'}
                  image={image_2}
                  style={{width: 280, height: 280, marginTop: 75}}
                />
              </View>
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: '#0066FF',
            image: (
              <ImageText
                text={
                  '공항, 항공사에서 제공하는\n교통약자 서비스를\n한눈에 살펴볼 수 있어요.'
                }
                image={image_3}
                style={{width: 265, height: 305, marginTop: 30}}
              />
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: '#0066FF',
            image: (
              <ImageText
                text={
                  '고객센터, 사이트로 바로 연결해\n교통약자 서비를 쉽게신청해보세요.'
                }
                image={image_4}
                style={{width: 280, height: 300, marginTop: 65}}
              />
            ),
          },
        ]}
      />
    </>
  );
}
const navBarStyle = (backgroundColor: string) =>
  StyleSheet.create({
    navBar: {
      alignItems: 'center',
      width: wp('22%'),
      height: 3,
      marginHorizontal: 3,
      backgroundColor: backgroundColor,
      borderWidth: 0,
      borderRadius: 5,
    },
    textPosition: {
      bottom: 10,
    },
  });
