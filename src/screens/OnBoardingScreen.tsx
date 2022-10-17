import React from 'react';
import {Alert, Button, View, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Done from '../components/DoneButton';
import SkipButton from '../components/SkiptButton';

const Square = ({isLight, selected}: any) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return <View style={navBarStyle(backgroundColor).navBar} />;
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
        // NextButtonComponent={Next}
        SkipButtonComponent={SkipButton}
        DoneButtonComponent={Done}
        bottomBarHighlight={false}
        bottomBarHeight={50}
        showNext={false}
        onSkip={() => Alert.alert('Skipped')}
        // onDone
        skipLabel={'시작하기?'}
        onDone={() => Alert.alert('Skipped')}
        pages={[
          {
            title: 'Hey!',
            subtitle: 'Welcome to $App!',
            backgroundColor: '#003c8f',
            image: <Icon name="home" size={100} color="white" />,
          },
          {
            title: 'Send Messages',
            subtitle: 'You can reach everybody with us',
            backgroundColor: '#5e92f3',
            image: <Icon name="search" size={100} color="white" />,
          },
          {
            title: 'Get Notified',
            subtitle:
              'We will send you notification as soon as something happened',
            backgroundColor: '#1565c0',
            image: <Icon name="view-stream" size={100} color="white" />,
          },
          {
            title: "That's Enough",
            subtitle: <Button title="Learn More" />,
            backgroundColor: '#003c8f',
            image: <Icon name="search" size={100} color="white" />,
          },
        ]}
      />
    </>
  );
}
// const styles = StyleSheet.create({
//   button: {
//     // backgroundColor: 'white',
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//     marginRight: 10,
//   },
//   buttonText: {
//     fontSize: 15,
//     textAlign: 'center',
//   },
//   test: {flex: 1, backgroundColor: 'black'},
// });

const navBarStyle = (backgroundColor: string) =>
  StyleSheet.create({
    navBar: {
      width: 50,
      height: 5,
      marginHorizontal: 6,
      backgroundColor: backgroundColor,
      marginBottom: 300,
    },
  });
export default OnboardingScreen;
