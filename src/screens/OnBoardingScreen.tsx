import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import SkipButton from '../components/SkiptButton';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from './RootStack';
// import {SafeAreaView} from 'react-native-safe-area-context';
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
        onSkip={() => navigation.navigate('SignIn')}
        onDone={() => navigation.navigate('SignIn')}
        pages={[
          {
            title: '',
            subtitle: '',
            backgroundColor: 'rgb(5,73,255)',
            image: (
              <View style={pageStyles.form}>
                <View>
                  <Text style={pageStyles.title}>
                    오늘 비행기를 타고 {'\n'} 국내 여행을 떠나시나요?
                  </Text>
                </View>
                <View style={pageStyles.image} />
              </View>
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: 'rgba(5,73,255,0.9)',
            image: (
              <View style={pageStyles.form}>
                <View>
                  <Text style={pageStyles.title}>
                    친구들을 등록해서 {'\n'} 서로의 위치를 확인할 수 있어요.
                  </Text>
                </View>
                <View style={pageStyles.image} />
              </View>
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: 'rgb(5,73,255)',
            image: (
              <View style={pageStyles.form}>
                <View>
                  <Text style={pageStyles.title}>
                    공항, 항공사에서 제공하는 {'\n'} 교통약자 서비스를 {'\n'}
                    한눈에 살펴볼 수 있어요.
                  </Text>
                </View>
                <View style={pageStyles.image} />
              </View>
            ),
          },
          {
            title: '',
            subtitle: '',
            backgroundColor: 'rgba(5,73,255,0.9)',
            image: (
              <View style={pageStyles.form}>
                <View>
                  <Text style={pageStyles.title}>
                    고객센터, 사이트로 바로 연결해 {'\n'} 교통약자 서비를 쉽게
                    신청해보세요.
                  </Text>
                </View>
                <View style={pageStyles.image} />
              </View>
            ),
          },
        ]}
      />
    </>
    // </SafeAreaView>
  );
}
const pageStyles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
  },
  image: {
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 2,
    padding: '20%',
    width: 200,
    height: 250,
  },
  imageContainer: {
    // top: hp('10%'),
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('0%'),
    width: '80%',
  },
});
const navBarStyle = (backgroundColor: string) =>
  StyleSheet.create({
    navBar: {
      width: 80,
      height: 3,
      marginHorizontal: 6,
      backgroundColor: backgroundColor,
      bottom: hp('80%'),
    },
  });
