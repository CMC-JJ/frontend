import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, EmptySchedule, FontText, TabHeader} from '@/components';
import {useAuthStore} from '@/store';
import type {ScheduleStackParamList} from '@/screens';
// import {useQuery} from 'react-query';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {ScheduleNavigationProp} from '@/screens';
import AIcon from 'react-native-vector-icons/AntDesign';
import {request} from '@/utils';

type currentTabType = 'future' | 'past';
type currentFilterType = 'latest' | 'oldest' | 'boardingTime';

type queryParamsType = {
  type: currentTabType;
  sort?: 'latest' | 'oldest' | 'boardingTime';
  page?: string;
};

// const fetchSchedule = (type: currentTabType, jwtToken: string) => {
//   const params: queryParamsType = {type};

//   if (type === 'past') {
//     params.sort = 'latest';
//     params.page = '1';
//   }

//   return fetch(
//     `https://dev.jj-gotogether.shop/web/schedules?${new URLSearchParams(
//       params,
//     ).toString()}`,
//     {
//       method: 'GET',
//       headers: {
//         'x-access-token': `${jwtToken}`,
//       },
//     },
//   ).then(res => res.json());
// };

type Schedule = {
  scheduleId: number;
  airlineId: number;
  airlineName: string;
  arrivalAirportId: number;
  arrivalAirportName: string;
  departureAirportId: number;
  departureAirportName: string;
  leftDay?: string;
  scheduleName: string;
  startAt: string;
};

// type ScheduleType = {
//   schedules: Schedule[];
// };

// type QueryType = {
//   code: number;
//   isSuccess: boolean;
//   message: string;
//   result: ScheduleType;
// };

// const {data, isLoading} = useQuery<QueryType, Error>(currentTab, () =>
//   fetchSchedule(currentTab, auth.jwtToken),
// );

type ScheduleScreenRouteProp = RouteProp<
  ScheduleStackParamList,
  'ScheduleScreen'
>;

//TODO: 무한 스크롤 구현 필요
//TODO: 필터링 기능 추가(최신순, 오래된 순, 탑승시간순)
export function ScheduleScreen() {
  const {auth} = useAuthStore();
  const {params} = useRoute<ScheduleScreenRouteProp>();

  const navigation = useNavigation<ScheduleNavigationProp>();
  const [currentTab, setCurrentTab] = useState<currentTabType>('future');
  const [currentFilterTab, setCurrentFilterTab] =
    useState<currentFilterType>('latest');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [data, setData] = useState<Schedule[]>([]);

  // TODO: 이 부분 필터링에 맞게 수정
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const params: queryParamsType = {type: currentTab};

      if (currentTab === 'past') {
        params.sort = 'latest';
        params.page = '1';
      }

      const res = await request('web/schedules/', params, 'GET');

      setData(res.result.schedules);
      setIsLoading(false);
    })();
  }, [auth.jwtToken, currentTab, refresh, params]);

  const isCurrentFutureTabActive = currentTab === 'future';

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          {
            position: 'absolute',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: {width: 0, height: -3},
            shadowOpacity: 0.5,
            elevation: 10,
          },
          Platform.OS === 'ios' && {height: 96},
        ],
      });
    }, [navigation]),
  );

  const onPressDeleteButton = async (id: number) => {
    const result = await request(
      'web/schedules/status',
      {
        scheduleId: id,
      },
      'PATCH',
    );

    if (result.isSuccess) {
      Alert.alert('일정이 삭제되었습니다.');
      setRefresh(!refresh);
    } else {
      Alert.alert(result.message);
    }
  };

  const onPressReviewButton = (id: number) => {
    navigation.navigate('Review', {
      scheduleId: id,
    });
  };

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
      {/* TODO: 데이터 있고 없고 분리(flat list로 데이터 보여주기) */}
      <ScrollView style={styles.scrollContainer}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color="#0066ff" />
          </View>
        ) : isCurrentFutureTabActive ? (
          data?.length === 0 ? (
            <EmptySchedule
              firstText="즐거운 여행길"
              secondText="일정과 항공편을 등록해 보세요"
            />
          ) : (
            <>
              {data?.map(schedule => (
                <TouchableOpacity
                  key={schedule.scheduleId}
                  onPress={() => {
                    navigation.navigate('ScheduleDetail', {
                      scheduleId: schedule.scheduleId,
                    });
                  }}>
                  <Card
                    airlineName={schedule.airlineName}
                    arrivalAirportName={schedule.arrivalAirportName}
                    departureAirportName={schedule.departureAirportName}
                    leftDay={schedule.leftDay}
                    scheduleName={schedule.scheduleName}
                    scheduleId={schedule.scheduleId}
                    startAt={schedule.startAt}
                    onPressDeleteButton={onPressDeleteButton}
                    // 수정 버튼 위한 이벤트
                    onPressReviewOrEditButton={() => {}}
                  />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addSchedule}
                onPress={() => {
                  navigation.navigate('Title');
                }}>
                <AIcon name="pluscircleo" size={20} color="#0066FF" />
              </TouchableOpacity>
            </>
          )
        ) : data?.length === 0 ? (
          <EmptySchedule
            firstText="지난 일정이 없습니다!"
            secondText="일정을 추가해주세요"
          />
        ) : (
          <>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  currentFilterTab === 'latest' && styles.activeFilterButton,
                ]}
                onPress={() => {
                  setCurrentFilterTab('latest');
                }}>
                <FontText
                  style={[
                    styles.filterButtonText,
                    currentFilterTab === 'latest' &&
                      styles.activeFilterButtonText,
                  ]}>
                  최신순
                </FontText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  currentFilterTab === 'oldest' && styles.activeFilterButton,
                ]}
                onPress={() => {
                  setCurrentFilterTab('oldest');
                }}>
                <FontText
                  style={[
                    styles.filterButtonText,
                    currentFilterTab === 'oldest' &&
                      styles.activeFilterButtonText,
                  ]}>
                  오래된순
                </FontText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  currentFilterTab === 'boardingTime' &&
                    styles.activeFilterButton,
                ]}
                onPress={() => {
                  setCurrentFilterTab('boardingTime');
                }}>
                <FontText
                  style={[
                    styles.filterButtonText,
                    currentFilterTab === 'boardingTime' &&
                      styles.activeFilterButtonText,
                  ]}>
                  탑승 시간순
                </FontText>
              </TouchableOpacity>
            </View>
            {data?.map(schedule => (
              <TouchableOpacity
                key={schedule.scheduleId}
                onPress={() => {
                  navigation.navigate('ScheduleDetail', {
                    scheduleId: schedule.scheduleId,
                  });
                }}>
                <Card
                  airlineName={schedule.airlineName}
                  arrivalAirportName={schedule.arrivalAirportName}
                  departureAirportName={schedule.departureAirportName}
                  scheduleName={schedule.scheduleName}
                  startAt={schedule.startAt}
                  scheduleId={schedule.scheduleId}
                  isPast={true}
                  onPressDeleteButton={onPressDeleteButton}
                  onPressReviewOrEditButton={onPressReviewButton}
                />
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: 20,
  },
  loading: {
    marginTop: 230,
  },
  addSchedule: {
    marginTop: 20,
    marginHorizontal: 5,
    marginBottom: 100,
    borderRadius: 12,
    height: 64,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  filterContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  filterButton: {
    marginLeft: 7,
    paddingHorizontal: 12,
    paddingVertical: 1.5,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 45,
    borderWidth: 1.3,
    borderStyle: 'solid',
    borderColor: '#BCBCBC',
  },
  activeFilterButton: {
    borderColor: '#0066FF',
  },
  filterButtonText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 24,
    color: '#BCBCBC',
  },
  activeFilterButtonText: {
    fontWeight: '700',
    color: '#0066FF',
  },
});
