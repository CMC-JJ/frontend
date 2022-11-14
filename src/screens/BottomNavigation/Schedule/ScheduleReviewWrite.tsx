import {ArrowBack, FontText, SignButton} from '@/components';
import type {
  AirlineService,
  AirportServices,
  ScheduleStackParamList,
  ScheduleNavigationProp,
} from '@/screens';
import {useAuthStore} from '@/store';
import {request} from '@/utils';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

type ScheduleReviewProp = RouteProp<ScheduleStackParamList, 'Write'>;

export function ScheduleReviewWrite() {
  const {
    params: {name, scheduleId, airId, services, logoImageUrl, region},
  } = useRoute<ScheduleReviewProp>();
  const navigation = useNavigation<ScheduleNavigationProp>();
  const {auth} = useAuthStore();
  const isAirport = region !== undefined;
  const [starCount, setStarCount] = useState<number>(3);
  const [review, setReview] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (review.trim().length > 0 && review.trim().length < 200) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [review]);

  const onPress = async () => {
    const bodyData = isAirport
      ? {
          userId: auth.userId,
          airportId: airId,
          scheduleId: scheduleId,
          airportServiceIds: services.map(
            service => (service as AirportServices).airportServiceId,
          ),
          content: review,
          score: starCount,
        }
      : {
          userId: auth.userId,
          airlineId: airId,
          scheduleId: scheduleId,
          airlineServiceIds: services.map(
            service => (service as AirlineService).airlineServiceId,
          ),
          content: review,
          score: starCount,
        };

    const res = await request(
      `web/${isAirport ? 'airports' : 'airlines'}/reviews`,
      bodyData,
      'POST',
    );

    console.log(
      services.map(service => (service as AirportServices).airportServiceId),
    );
    console.log(bodyData);

    console.log(res);

    if (res.isSuccess) {
      Alert.alert('등록이 완료되었습니다.');
      navigation.navigate('Review', {
        scheduleId: scheduleId,
      });
    } else {
      Alert.alert('리뷰 작성에 실패하였습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} color="black" />}
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <FontText style={styles.header}>{'리뷰 작성하기'}</FontText>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.logoWrapper}>
            {isAirport ? (
              <FontText style={styles.logoText}>{region}</FontText>
            ) : (
              <Image style={styles.logo} source={{uri: logoImageUrl}} />
            )}
          </View>
          <View style={styles.serviceContainer}>
            <FontText style={styles.serviceName}>{name}</FontText>
            <View style={styles.serviceItemContainer}>
              {services.map(service => (
                <View
                  key={
                    isAirport
                      ? (service as AirportServices).airportServiceId
                      : (service as AirlineService).airlineServiceId
                  }
                  style={styles.serviceItem}>
                  <FontText style={styles.serviceItemText}>
                    {service.name}
                  </FontText>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.divideLine} />
        <View style={styles.starRating}>
          <AirbnbRating
            showRating={false}
            size={25}
            selectedColor="#0066FF"
            unSelectedColor="#E5F0FF"
            onFinishRating={setStarCount}
            starImage={require('@/assets/images/star.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* 이 부분 안드로이드 수정 */}
          <TextInput
            placeholder={
              '공항, 항공사 서비스에 대한 솔직한 리뷰를 남겨주세요. (200자 이하)'
            }
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            style={styles.input}
            value={review}
            onChangeText={setReview}
            blurOnSubmit={true}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <SignButton
          isValid={isValid}
          buttonText="리뷰 작성완료"
          onPress={onPress}
        />
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
  container: {
    flex: 0.9,
    marginTop: 25,
    paddingHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 34,
    color: 'black',
  },
  reviewContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  imageContainer: {},
  serviceContainer: {
    marginTop: 10,
    marginLeft: 24,
  },
  logoWrapper: {
    width: 66,
    height: 66,
    backgroundColor: 'white',
    borderRadius: 66,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#0066FF',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 10,
  },
  logo: {
    width: 66,
    height: 66,
  },
  logoText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: '#0066FF',
  },
  serviceName: {
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 28,
  },
  serviceItemContainer: {
    marginTop: 10,
    marginLeft: -7,
    flexDirection: 'row',
  },
  serviceItem: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 7,

    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#0066FF',
  },
  serviceItemText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 24,
    color: '#0066FF',
  },
  divideLine: {
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  starRating: {
    marginTop: 24,
  },
  inputContainer: {
    marginTop: 30,
    minHeight: 260,
    padding: 19,
    paddingTop: Platform.OS === 'ios' ? 14 : 19,
    borderRadius: 12,
    backgroundColor: 'white',

    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    elevation: 4,
  },
  input: {
    marginTop: Platform.OS === 'android' ? -10 : 0,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 15,
  },
  footer: {
    flex: 0.1,

    marginBottom: 34,
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
  },
});
