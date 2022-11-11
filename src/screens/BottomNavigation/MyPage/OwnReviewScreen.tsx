import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {FontText} from '@/components/FontText';
import {ArrowBack} from '@/components';
import Icon from 'react-native-vector-icons/Entypo';
import {InfoDetailCompleteRouteProp} from './MyPageScreen';
import {useRoute} from '@react-navigation/native';
import {
  ownReviewAirlineDelete,
  ownReviewAirportDelete,
  ownReviewList,
} from '@/utils/fetchMypage';
import IconOct from 'react-native-vector-icons/Octicons';
interface OwnReview {
  id: number;
  uid: string;
  name: string;
  region?: string;
  score: string;
  content: string;
  createdAt: string;
  logoImageUrl?: string;
  reviewedAirportServices?: string[];
  reviewedAirlineServices?: string[];
  type: string;
}

const UsedService = React.memo(
  ({type, reviewedAirportServices, reviewedAirlineServices}: OwnReview) => {
    const elemList = useMemo(
      () =>
        (type === 'AIRPORT'
          ? reviewedAirportServices
          : reviewedAirlineServices
        )?.map((elem: any, i: number) => (
          <View key={i} style={styleReview.ReviewForm}>
            <FontText style={styleReview.Review}>{elem}</FontText>
          </View>
        )),
      [reviewedAirlineServices, reviewedAirportServices, type],
    );
    return <View style={styleReview.ReviewContainer}>{elemList}</View>;
  },
);
const noticeArr = [
  '삭제된 후기는 복구할 수 없습니다.',
  '후기 삭제는 후기 작성이후로부터 30일 이후에 가능합니다.',
];
const ReviewNotice = () => (
  <View style={styles.notice}>
    {noticeArr.map((text: string, i: number) => (
      <View style={styles.dotText} key={i}>
        <IconOct style={styles.dot} size={10} color="#909397" name="dot-fill" />
        <FontText style={styles.noticeFont}>{text}</FontText>
      </View>
    ))}
  </View>
);
export function OwnReviewScreen() {
  const {params} = useRoute<InfoDetailCompleteRouteProp>();
  const [reviewList, setReviewList] = useState<OwnReview[]>();
  useEffect(() => {
    ownReviewList(params.auth.userId).then(result => setReviewList(result));
  }, [params.auth.userId]);
  useEffect(() => {
    console.log(reviewList);
  }, [reviewList]);

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <View style={styles.back}>
          {Platform.OS === 'ios' && <ArrowBack size={28} />}
        </View>
        <View>
          <FontText
            style={[
              styles.headerTitle,
              Platform.OS === 'android' && {fontWeight: '700'},
            ]}>
            내가 쓴 리뷰
          </FontText>
        </View>
      </View>

      {/* 1 */}
      {/* <View style={styleNoReview.nullReview}>
        <View style={styleNoReview.container}>
          <View style={styleNoReview.circle} />
          <View style={styleNoReview.announcementMessage}>
            <FontText style={styleNoReview.message}>
              {'작성하신 리뷰가 없습니다!\n리뷰를 작성해주세요!'}
            </FontText>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styleNoReview.writeReview}>
            <FontText style={styleNoReview.addText}>리뷰 작성하기</FontText>
            <Icon name="chevron-right" color="#0066FF" size={20} />
          </TouchableOpacity>
        </View>
      </View> */}
      {/* 2 */}

      <FlatList
        ListHeaderComponent={
          <View style={styles.noticeContainer}>
            <ReviewNotice />
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <View style={styleReview.cardForm}>
              <View style={styleReview.reviewTitle}>
                <View style={styleReview.circle}>
                  {item?.logoImageUrl ? (
                    <Image
                      source={{
                        uri: item?.logoImageUrl,
                      }}
                      style={styleReview.image}
                    />
                  ) : (
                    <FontText style={styleReview.regionText}>
                      {item?.region}
                    </FontText>
                  )}
                </View>

                <FontText style={styleReview.name}>{item.name}</FontText>
                <View style={styleReview.starAvgContainer}>
                  <Icon
                    name="star"
                    size={15}
                    color="#0066FF"
                    style={styleReview.star}
                  />
                  <FontText style={styleReview.avgReview}>
                    {item?.score}
                  </FontText>
                </View>
              </View>
              <FontText style={styleReview.date}>
                작성일 : {item?.createdAt}
              </FontText>
              <UsedService {...item} />
              <FontText style={styleReview.content}>{item?.content}</FontText>
              <TouchableOpacity
                style={styleReview.button}
                onPress={() => {
                  (item.type === 'AIRPORT'
                    ? ownReviewAirportDelete(item.id)
                    : ownReviewAirlineDelete(item.id)
                  ).then(result =>
                    result.isSuccess === true
                      ? Alert.alert('리뷰가 삭제되었습니다.')
                      : Alert.alert(`${result.message}`),
                  );
                }}>
                <FontText style={styleReview.buttonText}>삭제하기</FontText>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.uid}
        data={reviewList}
      />
    </SafeAreaView>
  );
}
const styleReview = StyleSheet.create({
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
  cardForm: {
    display: 'flex',
    minHeight: 129,
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
    elevation: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  content: {
    marginTop: 9.5,
    fontSize: 15,
    fontWeight: '400',
    color: '#121212',
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
    marginRight: 5,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
    marginRight: 10,
  },
  image: {
    width: 35,
    height: 35,
  },
  date: {
    fontSize: 13,
    fontWeight: '400',
    color: '#979797',
    marginTop: 5,
    marginBottom: 3.5,
  },
  avgReview: {
    color: '#121212',
    fontSize: 13,
    fontWeight: '600',
  },
  regionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0066FF',
  },
  starAvgContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  button: {
    height: 39,
    backgroundColor: '#0066FF',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 13,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
});
// const styleNoReview = StyleSheet.create({
//   nullReview: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     bottom: 10,
//   },
//   container: {justifyContent: 'center', alignItems: 'center'},
//   circle: {
//     borderRadius: 120,
//     width: 120,
//     height: 120,
//     backgroundColor: '#D9D9D9',
//   },
//   announcementMessage: {
//     marginTop: 33,
//     alignItems: 'center',
//   },
//   message: {
//     fontWeight: '400',
//     fontSize: 15,
//     lineHeight: 23,
//     textAlign: 'center',
//   },
//   writeReview: {
//     flexDirection: 'row',
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addText: {
//     fontWeight: '700',
//     fontSize: 18,
//     lineHeight: 28,
//     color: '#0066FF',
//     marginRight: 5,
//     paddingLeft: 5,
//   },
// });
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 5,
    paddingTop: 5,
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  cardContainer: {paddingHorizontal: 30, paddingTop: 5},
  noticeContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 32,
  },
  notice: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#DEDEDE',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  noticeFont: {
    lineHeight: 20,
    fontSize: 13,
    fontWeight: '400',
    color: '#7B7F83',
  },
  dotText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  dot: {
    marginRight: 6,
  },
});
