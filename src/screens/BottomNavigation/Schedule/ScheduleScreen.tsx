import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabHeader} from '@/components';
import {useAuthStore} from '@/store';
import Icon from 'react-native-vector-icons/Entypo';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import type {ScheduleNavigationProp} from '@/screens';
// import {request} from '../utils';

type currentTabType = 'future' | 'past';

type queryParamsType = {
  type: currentTabType;
  sort?: 'latest' | 'oldest' | 'boardingTime';
  page?: string;
};

const fetchSchedule = (type: currentTabType, jwtToken: string) => {
  const params: queryParamsType = {type};

  if (type === 'past') {
    params.sort = 'latest';
    params.page = '1';
  }

  return fetch(
    `https://dev.jj-gotogether.shop/web/schedules?${new URLSearchParams(
      params,
    ).toString()}`,
    {
      method: 'GET',
      headers: {
        'x-access-token': `${jwtToken}`,
      },
    },
  ).then(res => res.json());
};

export function ScheduleScreen() {
  const {auth} = useAuthStore();
  const navigation = useNavigation<ScheduleNavigationProp>();
  const [currentTab, setCurrentTab] = useState<currentTabType>('future');

  const {data, isLoading} = useQuery(currentTab, () =>
    fetchSchedule(currentTab, auth.jwtToken),
  );

  console.log(data);

  const isCurrentFutureTabActive = currentTab === 'future';

  //TODO: 일정 리스트를 조회하는 부분에 있어서 데이터 캐싱이 필요함(서버 데이터 관리 -> query 사용..?)

  //TODO: 무한 스크롤 구현 필요

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <TabHeader text="여행 일정" />
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={[
            styles.textContainer,
            isCurrentFutureTabActive && styles.activeContainer,
          ]}
          onPress={() => {
            setCurrentTab('future');
          }}>
          <Text
            style={[
              styles.tabText,
              isCurrentFutureTabActive && styles.activeText,
            ]}>
            등록된 일정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.textContainer,
            !isCurrentFutureTabActive && styles.activeContainer,
          ]}
          onPress={() => {
            setCurrentTab('past');
          }}>
          <Text
            style={[
              styles.tabText,
              !isCurrentFutureTabActive && styles.activeText,
            ]}>
            지난 일정
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {/* 데이터가 없는 경우 이 부분 표시 */}
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color="#0066ff" />
          </View>
        ) : (
          // TODO: 데이터 있고 없고 분리(flat list로 데이터 보여주기)
          <>
            <View style={styles.container}>
              <View style={styles.circle} />
              <View style={styles.announcementMessage}>
                <Text style={styles.message}>
                  {isCurrentFutureTabActive
                    ? '즐거운 여행길'
                    : '지난 일정이 없습니다!'}
                </Text>
                <Text style={styles.message}>
                  {isCurrentFutureTabActive
                    ? '일정과 항공편을 등록해 보세요'
                    : '일정을 추가해주세요'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addSchedule}
              onPress={() => {
                navigation.navigate('Title');
              }}>
              <Text style={styles.addText}>일정 추가하기</Text>
              <Icon name="chevron-right" color="#0066FF" size={20} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    marginTop: 13,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  tabText: {
    paddingVertical: 10,

    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
    color: 'black',
  },
  activeContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066FF',
  },
  activeText: {
    fontWeight: '600',
    color: '#0066FF',
  },
  scrollContainer: {
    flex: 1,
  },
  loading: {
    marginTop: 230,
  },
  container: {
    marginTop: 120,

    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 120,
    width: 120,
    height: 120,
    backgroundColor: '#D9D9D9',
  },
  announcementMessage: {
    marginTop: 33,
    alignItems: 'center',
  },
  message: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,

    color: '#000000',
  },
  addSchedule: {
    flexDirection: 'row',
    marginTop: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    marginRight: 2,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: '#0066FF',
  },
});
