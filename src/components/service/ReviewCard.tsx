import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import FontText from '../FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import {reportAirlineReview, reportAirportReview} from '@/utils/fetch';

export interface ReviewProps extends ReviewSame {
  airlineReviewdId?: number;
  reviewedAirlineServices?: string[];
}
export interface ReviewProps extends ReviewSame {
  airportReviewdId?: number;
  reviewedAirportServices?: string[];
}
export interface ReviewSame {
  uid: string;
  nickName: string;
  score: string;
  content: string;
  createdAt: string;
}
export default function ReviewCard({
  data,
  currentTab,
}: {
  data: ReviewProps | undefined;
  currentTab: 'airport' | 'airline';
}) {
  const usedService = useMemo(
    () => (
      <View style={styles.ownReviewContainer}>
        {data &&
          (currentTab === 'airport'
            ? data.reviewedAirportServices
            : data.reviewedAirlineServices
          )?.map((elem, i) => (
            <View key={i} style={styles.ownReviewForm}>
              <FontText style={styles.ownReview}>{elem}</FontText>
            </View>
          ))}
      </View>
    ),
    [currentTab, data],
  );
  const onReport = () => {
    const res =
      currentTab === 'airport'
        ? reportAirportReview(data?.airportReviewdId)
        : reportAirlineReview(data?.airlineReviewdId);

    console.log(res);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.review}>
        <View style={styles.reviewTitle}>
          <FontText style={styles.name}>{data?.nickName}</FontText>
          <Icon name="star" size={13} color="#0066FF" style={styles.star} />
          <FontText style={styles.avgReview}>{data?.score}</FontText>
          <FontText style={styles.date}>{data?.createdAt}</FontText>

          <TouchableOpacity onPress={onReport} style={styles.report}>
            <FontText>신고하기</FontText>
          </TouchableOpacity>
        </View>
        {/* 리뷰종류 */}
        {usedService}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: 129,
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  review: {
    paddingHorizontal: 20,
    paddingVertical: 34,
    marginBottom: 10,
  },
  reviewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7.5,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
  },
  star: {
    marginLeft: 10,
  },
  avgReview: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0066FF',
    marginLeft: 4,
  },
  date: {
    position: 'absolute',
    right: 60,
    color: '#979797',
    fontSize: 13,
    fontWeight: '400',
  },
  report: {
    position: 'absolute',
    right: 0,
  },
  ownReviewContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  ownReview: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    paddingVertical: 1.5,
    paddingHorizontal: 9,
  },
  ownReviewForm: {
    minWidth: 60,
    height: 26,
    borderRadius: 29,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    marginVertical: 5,
  },
});
