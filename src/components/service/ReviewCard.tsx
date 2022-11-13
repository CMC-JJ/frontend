import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {FontText} from '../FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {ServiceNavgationProp} from '@/screens';

export interface ReviewProps extends ReviewSame {
  airlineReviewId?: number;
  reviewedAirlineServices?: string[];
}
export interface ReviewProps extends ReviewSame {
  airportReviewId?: number;
  reviewedAirportServices?: string[];
}
export interface ReviewSame {
  uid: string;
  nickName?: string;
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
  const navigation = useNavigation<ServiceNavgationProp>();
  const usedService = useMemo(
    () => (
      <View style={styles.ReviewContainer}>
        {data &&
          (currentTab === 'airport'
            ? data.reviewedAirportServices
            : data.reviewedAirlineServices
          )?.map((elem, i) => (
            <View key={i} style={styles.ReviewForm}>
              <FontText style={styles.Review}>{elem}</FontText>
            </View>
          ))}
      </View>
    ),
    [currentTab, data],
  );
  const onReport = () => {
    data &&
      navigation.navigate('R', {
        id:
          currentTab === 'airport'
            ? data?.airportReviewId
            : data?.airlineReviewId,
        type: currentTab,
      });
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
        <FontText style={styles.content}>{data?.content}</FontText>
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
  ReviewContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  Review: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    paddingVertical: 1.5,
    paddingHorizontal: 9,
  },
  ReviewForm: {
    minWidth: 60,
    height: 26,
    borderRadius: 29,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    marginVertical: 5,
  },
  content: {
    marginTop: 9.5,
    fontSize: 15,
    fontWeight: '400',
    color: '#121212',
  },
});
