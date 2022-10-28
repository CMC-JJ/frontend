import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabHeader} from '../components';
import {useAuthStore} from '../store';
import Icon from 'react-native-vector-icons/Entypo';

export function ScheduleScreen() {
  const [currentTab, setCurrentTab] = useState<'registered' | 'past'>(
    'registered',
  );

  const isCurrentRegisteredTabActive = currentTab === 'registered';

  const {auth} = useAuthStore();

  console.log(auth);

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
            isCurrentRegisteredTabActive && styles.activeContainer,
          ]}
          onPress={() => {
            setCurrentTab('registered');
          }}>
          <Text
            style={[
              styles.tabText,
              isCurrentRegisteredTabActive && styles.activeText,
            ]}>
            등록된 일정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.textContainer,
            !isCurrentRegisteredTabActive && styles.activeContainer,
          ]}
          onPress={() => {
            setCurrentTab('past');
          }}>
          <Text
            style={[
              styles.tabText,
              !isCurrentRegisteredTabActive && styles.activeText,
            ]}>
            지난 일정
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {/* 데이터가 없는 경우 이 부분 표시 */}
        <View style={styles.container}>
          <View style={styles.circle} />
          <View style={styles.announcementMessage}>
            <Text style={styles.message}>즐거운 여행길</Text>
            <Text style={styles.message}>일정과 항공편을 등록해 보세요.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addSchedule}>
          <Text style={styles.addText}>일정 추가하기</Text>
          <Icon name="chevron-right" color="#0066FF" size={20} />
        </TouchableOpacity>
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
