import React from 'react';
import {View, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import SkipButton from '../components/SkiptButton';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from './RootStack';
import ImageText from '../components/onBoarding/ImageText';
const Square = ({selected}: any) => {
  let backgroundColor;
  backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  return (
    <View style={{}}>
      <View style={[navBarStyle(backgroundColor).navBar]} />
    </View>
  );
};

export function OnboardingScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    // <SafeAreaView>
    <>
      <Onboarding
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
            backgroundColor: 'rgb(5,73,255)',
            image: (
              <ImageText text={'오늘 비행기를 타고\n국내 여행을 떠나시나요?'} />
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: 'rgba(5,73,255,0.9)',
            image: (
              <ImageText
                text={'친구들을 등록해서\n서로의 위치를 확인할 수 있어요.'}
              />
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: 'rgb(5,73,255)',
            image: (
              <ImageText
                text={
                  '공항, 항공사에서 제공하는\n교통약자 서비스를\n한눈에 살펴볼 수 있어요.'
                }
              />
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: 'rgba(5,73,255,0.9)',
            image: (
              <ImageText
                text={
                  '고객센터, 사이트로 바로 연결해\n교통약자 서비를 쉽게신청해보세요.'
                }
              />
            ),
          },
        ]}
      />
    </>
    // </SafeAreaView>
  );
}
const navBarStyle = (backgroundColor: string) =>
  StyleSheet.create({
    navBar: {
      alignItems: 'center',
      width: 90,
      height: 3,
      marginHorizontal: 3,
      backgroundColor: backgroundColor,
      bottom: hp('80%'),
      borderWidth: 0,
      borderRadius: 5,
    },
  });
