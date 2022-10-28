import React from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SkipButton from '../components/SkiptButton';
// import SkipButton2 from '../components/SkipButton2';
const Square = ({selected}: any) => {
  let backgroundColor;
  backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  return (
    <View style={{}}>
      <View style={[navBarStyle(backgroundColor).navBar]} />
    </View>
  );
};

// const Done = ({...props}: any) => (
//   <View style={styles.button}>
//     <Button title={'done'} style={styles.test} {...props}>
//       <Text style={styles.buttonText}>Done</Text>
//     </Button>
//   </View>
// );

function OnboardingScreen() {
  return (
    <>
      <Onboarding
        showDone={true}
        DotComponent={Square}
        // NextButtonComponent={SkipButton2}
        SkipButtonComponent={SkipButton}
        DoneButtonComponent={SkipButton}
        bottomBarHighlight={false}
        bottomBarHeight={50}
        showNext={false}
        onSkip={() => Alert.alert('Skipped')}
        onDone={() => Alert.alert('Skipped')}
        pages={[
          {
            title: '오늘 비행기를 타고 \n 국내 여행을 떠나시나요?',
            subtitle: '',
            backgroundColor: 'rgb(5,73,255)',
            image: <Icon name="home" size={100} color="white" />,
          },
          {
            title: '친구들을 등록해서 \n 서로의 위치를 확인할 수 있어요!',
            subtitle: '',
            backgroundColor: 'rgba(5,73,255,0.9)',
            image: <Icon name="search" size={100} color="white" />,
          },
          {
            title:
              '공항, 항공사에서 제공하는 \n 교통약자 서비스를 \n 한눈에 살펴볼 수 있어요!',
            image: <Icon name="view-stream" size={100} color="white" />,
            subtitle: '',
            backgroundColor: 'rgb(5,73,255)',
          },
          {
            title:
              '고객센터, 사이트로 바로 연결해 \n 교통약자 서비를 쉽게 신청해보세요',
            subtitle: '',
            backgroundColor: 'rgba(5,73,255,0.9)',
            image: <Icon name="search" size={100} color="white" />,
          },
        ]}
      />
    </>
  );
}

const navBarStyle = (backgroundColor: string) =>
  StyleSheet.create({
    navBar: {
      width: 80,
      height: 3,
      marginHorizontal: 6,
      backgroundColor: backgroundColor,
      bottom: 700,
      zIndex: 100,
    },
  });
export default OnboardingScreen;
