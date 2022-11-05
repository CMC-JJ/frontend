import {ArrowBack, DateDisplay, FontText, SignButton} from '@/components';
import {useScheduleStore} from '@/store';
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export function ScheduleTime() {
  const {schedule} = useScheduleStore();
  const [time] = useState<string>('');

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <View style={styles.container}>
        <View style={styles.dateDisplayContainer}>
          <DateDisplay startDate={schedule.startAt} />
        </View>
        <FontText
          style={[
            styles.headerText,
            Platform.OS === 'android' && {fontWeight: '900'},
          ]}>
          {'비행기 출발\n시간을 등록해주세요'}
        </FontText>
        <FontText style={styles.guideMessage}>
          등록된 시간에 맞춰 알려드리며, 메인에 고정됩니다.
        </FontText>
        <View style={styles.timeContainer}>
          {/* <View> */}
          <Icon name="aircraft-take-off" size={20} color="#0066FF" />
          <FontText style={styles.directionText}>출발</FontText>
          {/* </View> */}
        </View>
        <View style={styles.footer}>
          <SignButton
            isValid={time !== ''}
            buttonText="다음"
            onPress={() => {
              // navigation.navigate('Time');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  dateDisplayContainer: {
    marginTop: 25,
  },
  container: {
    flex: 1,

    paddingHorizontal: 25,
  },
  headerText: {
    marginTop: 24,
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 34,
  },
  guideMessage: {
    marginTop: 12,

    fontWeight: '500',
    fontSize: 13,
    lineHeight: 20,
    color: '#7C7C7C',
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 35,

    alignItems: 'center',
  },
  directionText: {
    marginLeft: 12,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 23,
    color: '#0066FF',
  },
  footer: {
    flex: 1,

    marginBottom: 34,
    justifyContent: 'flex-end',
  },
});
