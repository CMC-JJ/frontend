import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontText} from './FontText';
import Icon from 'react-native-vector-icons/Entypo';

type CardProps = {
  airlineName: string;
  arrivalAirportName: string;
  departureAirportName: string;
  leftDay?: string;
  scheduleName: string;
  startAt: string;
  scheduleId: number;
  isPast?: boolean;
  isReviewComplete?: boolean;
  onPressDeleteButton: (scheduleId: number) => void;
  onPressReviewOrEditButton: (scheduleId: number) => void;
};

// TODO: 카드 컴포넌트 분리 필요!
// TODO: 카드 컴포넌트 눌렀을 때, 일정 상세 페이지로 이동!
export function Card({
  airlineName,
  arrivalAirportName,
  departureAirportName,
  leftDay,
  scheduleName,
  startAt,
  scheduleId,
  isReviewComplete,
  onPressDeleteButton,
  onPressReviewOrEditButton,
  isPast = false,
}: CardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderContainer}>
        <FontText style={styles.cardHeader}>{scheduleName}</FontText>
        {isPast ? (
          <View style={[styles.startAt, styles.pastStartAt]}>
            <FontText style={styles.startAtText}>{startAt}</FontText>
          </View>
        ) : (
          <View style={styles.dayleft}>
            <FontText style={styles.day}>{leftDay}</FontText>
          </View>
        )}
      </View>
      {!isPast && (
        <View style={styles.startAt}>
          <FontText style={styles.startAtText}>{startAt}</FontText>
        </View>
      )}
      <View style={styles.airSummary}>
        <View style={styles.airports}>
          <FontText style={styles.airportText}>{departureAirportName}</FontText>
          <Icon
            name="aircraft-take-off"
            size={20}
            color="#0066FF"
            style={styles.aircraft}
          />
          <FontText style={styles.airportText}>{arrivalAirportName}</FontText>
        </View>
        <View style={styles.dotContainer}>
          <View style={styles.circle} />
          <View style={styles.dotBorder} />
          <View style={styles.circle} />
        </View>
        <View style={styles.airline}>
          <FontText style={styles.airlineText}>{airlineName}</FontText>
        </View>
      </View>
      {/* TODO: onPress 이벤트 */}
      {/* TODO: 나중에 앱 업데이트시 수정하기 버튼 기능 넣기 */}
      {/* (
          <TouchableOpacity style={styles.editButton} onPress={() => {}}>
            <FontText style={styles.buttonText}>수정하기</FontText>
          </TouchableOpacity>
        ) */}
      {/* TODO: 이 부분 나중에 수정하기 기능 업데이트 시 스타일제거 */}
      <View style={styles.buttonContainer}>
        {isPast && (
          <TouchableOpacity
            style={[
              styles.editButton,
              styles.reviewButton,
              isReviewComplete === true && styles.disabledButton,
            ]}
            disabled={isReviewComplete === true}
            onPress={() => {
              onPressReviewOrEditButton(scheduleId);
            }}>
            <FontText
              style={[
                styles.reviewButtonText,
                isReviewComplete === true && styles.buttonText,
              ]}>
              {isReviewComplete === true ? '작성완료' : '리뷰쓰기'}
            </FontText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.deleteButton, !isPast && {flex: 1}]}
          onPress={() => {
            onPressDeleteButton(scheduleId);
          }}>
          <FontText style={styles.buttonText}>삭제</FontText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    borderRadius: 12,

    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 4,
  },
  cardHeaderContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeader: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
  },
  dayleft: {
    minWidth: 45,
    height: 27,
    borderRadius: 59,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  startAt: {
    marginTop: 6,
    width: 81,
    height: 26,
    borderRadius: 29,
    backgroundColor: '#F8F8F8',

    justifyContent: 'center',
    alignItems: 'center',
  },
  pastStartAt: {
    marginTop: 0,
  },
  startAtText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 24,
  },
  airSummary: {
    marginTop: 20,
    paddingHorizontal: 18,
  },
  airports: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airportText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
  },
  aircraft: {
    position: 'absolute',
    left: '47%',
    top: 13,
  },
  dotContainer: {
    marginTop: 15,
    paddingHorizontal: 42,
    flexDirection: 'row',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#0066FF',

    top: -4,
  },
  dotBorder: {
    width: '100%',
    borderColor: '#0066FF',
    borderWidth: 1,
    height: 1,
    borderStyle: 'dashed',
  },
  airline: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  airlineText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#0066FF',
  },
  buttonContainer: {
    marginTop: 20,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  editButton: {
    flex: 0.72,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
  },
  reviewButton: {
    backgroundColor: '#0066FF',
  },
  disabledButton: {
    backgroundColor: '#EFEFEF',
  },
  deleteButton: {
    flex: 0.25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#7C7C7C',
  },
  reviewButtonText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#FFFFFF',
  },
});
