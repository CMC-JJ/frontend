import {ArrowBack, DateDisplay, FontText, SignButton} from '@/components';
import {useScheduleStore} from '@/store';
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {formatTenDigit, formatTimeText} from '@/utils';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import type {ScheduleNavigationProp} from './ScheduleStack';

// TODO: switch-selector 개선
// TODO: 여기도 성능개선 필요
export function ScheduleTime() {
  const navigation = useNavigation<ScheduleNavigationProp>();
  const {schedule, setSchedule} = useScheduleStore();

  const [date, setDate] = useState(new Date());
  const [isAM, setIsAM] = useState<boolean>(
    date.getHours() > 12 ? false : true,
  );
  const [open, setOpen] = useState(false);

  const onPress = () => {
    const YYMMDD = schedule.startAt;
    setSchedule(
      'startAt',
      `${YYMMDD.slice(0, 10)} ${formatTenDigit(
        date.getHours(),
      )}:${formatTenDigit(date.getMinutes())}`,
    );

    navigation.navigate('Convenience');
  };

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
        <FontText style={styles.headerText}>
          {'비행기 출발\n시간을 등록해주세요'}
        </FontText>
        <FontText style={styles.guideMessage}>
          등록된 시간에 맞춰 알려드리며, 메인에 고정됩니다.
        </FontText>
        <View style={styles.timeContainer}>
          <View style={styles.imageText}>
            <Icon name="aircraft-take-off" size={20} color="#0066FF" />
            <FontText style={styles.directionText}>출발</FontText>
          </View>
          <View style={styles.switchTimeContainer}>
            <View style={styles.switch}>
              <TouchableOpacity
                style={isAM && styles.activeSwitch}
                onPress={() => {
                  setIsAM(true);
                }}>
                <FontText
                  style={[styles.switchText, isAM && styles.activeSwitchText]}>
                  오전
                </FontText>
              </TouchableOpacity>
              <TouchableOpacity
                style={!isAM && styles.activeSwitch}
                onPress={() => {
                  setIsAM(false);
                }}>
                <FontText
                  style={[styles.switchText, !isAM && styles.activeSwitchText]}>
                  오후
                </FontText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.timeBox}
              onPress={() => setOpen(true)}>
              <FontText style={styles.timeText}>
                {formatTimeText(date)}
              </FontText>
              <DatePicker
                modal
                mode="time"
                date={date}
                open={open}
                onConfirm={val => {
                  setOpen(false);
                  const hours = val.getHours();
                  if (hours >= 12) {
                    setIsAM(false);
                  } else {
                    setIsAM(true);
                  }
                  setDate(val);
                }}
                onCancel={() => setOpen(false)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <SignButton isValid={!!date} buttonText="다음" onPress={onPress} />
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
    justifyContent: 'space-between',
  },
  imageText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  directionText: {
    marginLeft: 12,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 23,
    color: '#0066FF',
  },
  switch: {
    width: 90,
    height: 36,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    borderRadius: 46,
    borderColor: 'white',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
  },
  switchText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 20,
    color: '#979797',
  },
  activeSwitch: {
    width: 35,
    height: 30,
    borderRadius: 14,
    backgroundColor: '#0066ff',

    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSwitchText: {
    fontWeight: '700',
    color: 'white',
  },
  switchTimeContainer: {
    flexDirection: 'row',
  },
  timeBox: {
    width: 90,
    height: 36,

    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 46,
    borderColor: 'white',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
  },
  timeText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
  },
  footer: {
    flex: 1,

    marginBottom: 34,
    justifyContent: 'flex-end',
  },
});
