import {ArrowBack, DateDisplay, SignButton, FontText} from '@/components';
import {useScheduleStore} from '@/store';
import {dateFormat} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import type {ScheduleNavigationProp} from './ScheduleStack';

export function ScheduleDate() {
  const {schedule, setSchedule} = useScheduleStore();
  const navigation = useNavigation<ScheduleNavigationProp>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  const today = dateFormat(new Date());
  const markedDates = {
    [today]: {
      selected: true,
      selectedColor: '#EFEFEF',
      selectedTextColor: 'black',
    },
    [schedule.startAt.slice(0, 10)]: {
      selected: true,
      selectedColor: '#0066FF',
      selectedTextColor: 'white',
      selectedDotColor: 'white',
      marked: true,
    },
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <View style={styles.headerContainer}>
        <FontText style={styles.header}>날짜 선택</FontText>
        <DateDisplay startDate={schedule.startAt} />
      </View>
      <View style={styles.dayNames}>
        <FontText style={styles.dayName}>일</FontText>
        <FontText style={styles.dayName}>월</FontText>
        <FontText style={styles.dayName}>화</FontText>
        <FontText style={styles.dayName}>수</FontText>
        <FontText style={styles.dayName}>목</FontText>
        <FontText style={styles.dayName}>금</FontText>
        <FontText style={styles.dayName}>토</FontText>
      </View>
      <View style={styles.divideLine} />
      <View style={styles.calendarConatiner}>
        {/* 몇초 로딩 보여줄지? 결정 */}
        <View style={styles.calendar}>
          <CalendarList
            style={[styles.calendarList, !isLoading && {opacity: 1}]}
            theme={{
              todayBackgroundColor: 'black',
              todayTextColor: 'blue',
            }}
            pastScrollRange={1}
            futureScrollRange={24}
            hideDayNames={true}
            onDayPress={day => setSchedule('startAt', day.dateString)}
            markedDates={markedDates}
            monthFormat={'yyyy년 MM월'}
          />
        </View>

        <View style={styles.footer}>
          <SignButton
            isValid={!!schedule.startAt}
            buttonText="다음"
            onPress={() => {
              navigation.navigate('AirService');
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
  headerContainer: {
    marginTop: 25,
    paddingHorizontal: 25,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 34,
    color: 'black',
  },
  dateDisplay: {
    width: 120,
    height: 32,

    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 5,

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,

    elevation: 2,
    shadowColor: '#000',
    backgroundColor: 'white',
  },
  imageSize: {
    marginLeft: 15,

    width: 27,
    height: 27,
  },
  dateText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,

    color: '#0066FF',
  },
  dayNames: {
    marginTop: 32,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dayName: {
    fontWeight: '600',
    fontSize: 15,
    lienHeight: 23,

    color: '#BCBCBC',
  },
  divideLine: {
    marginTop: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  calendarConatiner: {
    flex: 1,
  },
  calendar: {
    flex: 0.9,
  },
  loading: {
    marginTop: 230,
  },
  calendarList: {
    maxHeight: 470,
    opacity: 0,
  },
  footer: {
    flex: 0.1,

    marginBottom: 34,
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
  },
});

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';
