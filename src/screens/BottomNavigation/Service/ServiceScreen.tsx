import React, {ComponentProps, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontText} from '@/components/FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import ServiceIcon from '@/components/service/ServiceIcon';
import {AirDetailProps, ServiceCard} from '@/components/service/ServiceCard';
import {
  fetchAirlineLists,
  fetchAirlineReview,
  fetchAirlinesDetail,
  fetchAirportLists,
  fetchAirportReview,
  fetchAirportsDetail,
} from '@/utils/fetchService';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ReviewCard, {ReviewProps} from '@/components/service/ReviewCard';
import {useShowTabBar} from '@/hooks/useVisibleTabBar';
import {ServiceNavgationProp} from '@/screens';
import {ThinBar} from '@/components/BarSeparator';

export interface AirServiceProps
  extends ComponentProps<typeof TouchableOpacity> {
  id: number;
  name: string;
  logoImageUrl?: string;
  region?: string;
  onClick: boolean;
}
export function ServiceScreen() {
  const [airlineLists, setAirlineLists] = useState<AirServiceProps[]>([]);
  const [airportLists, setAirportLists] = useState<AirServiceProps[]>([]);
  const [airlineReview, setAirlineReview] = useState<ReviewProps[]>([]);
  const [airportReview, setAirportReview] = useState<ReviewProps[]>([]);
  const [currentTab, setCurrentTab] = useState<'airport' | 'airline'>(
    'airport',
  );
  const [menu, setMenu] = useState<AirServiceProps | null>(null);
  const [detail, setDetail] = useState<AirDetailProps | null>(null);
  const navigation = useNavigation<ServiceNavgationProp>();
  const page = useRef(1);
  useFocusEffect(useShowTabBar(navigation));
  useEffect(() => {
    if (menu) {
      switch (currentTab) {
        case 'airline':
          if (airlineLists) {
            page.current = 1;
            fetchAirlinesDetail(menu).then(_detail => setDetail(_detail));
            fetchAirlineReview(menu, page.current).then(review =>
              setAirlineReview(review),
            );
          }

          break;
        case 'airport':
          if (airportLists) {
            page.current = 1;
            fetchAirportsDetail(menu).then(_detail => setDetail(_detail));
            fetchAirportReview(menu, page.current).then(review =>
              setAirportReview(review),
            );
          }
          break;
      }
    }
  }, [airlineLists, airportLists, currentTab, menu]);

  useEffect(() => {
    switch (currentTab) {
      case 'airline':
        fetchAirlineLists().then(list => {
          setAirlineLists(list);
          setMenu(list[0]);
        });
        break;
      case 'airport':
        fetchAirportLists().then(list => {
          setAirportLists(list);
          setMenu(list[0]);
        });
        break;
    }
  }, [currentTab]);
  const fetchReviewScroll = () => {
    if (menu) {
      switch (currentTab) {
        case 'airline':
          page.current += 1;
          fetchAirlineReview(menu, page.current).then(review => {
            review && setAirlineReview(prev => [...prev, ...review]);
          });
          break;
        case 'airport':
          page.current += 1;
          fetchAirportReview(menu, page.current).then(review => {
            review && setAirportReview(prev => [...prev, ...review]);
          });
          break;
      }
    }
  };
  useFocusEffect(useShowTabBar(navigation));
  return (
    <SafeAreaView style={styles.fill}>
      <View style={{paddingHorizontal: 30}}>
        <View style={styles.titleContainer}>
          <FontText
            style={[
              styles.title,
              Platform.OS === 'android' && {fontWeight: '900'},
            ]}>
            항공서비스
          </FontText>
          <TouchableOpacity onPress={() => navigation.navigate('AirSearch')}>
            <Icon style={styles.icon} name="search1" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setCurrentTab('airport')}>
            <FontText
              style={[
                styles.tabText,
                currentTab === 'airport' && styles.activeText,
              ]}>
              공항
            </FontText>
          </TouchableOpacity>
          <View style={styles.bar} />
          <TouchableOpacity onPress={() => setCurrentTab('airline')}>
            <FontText
              style={[
                styles.tabText,
                currentTab === 'airline' && styles.activeText,
              ]}>
              항공사
            </FontText>
          </TouchableOpacity>
        </View>
      </View>
      {/* 아이콘&이름 */}
      <View style={[styleBody.icon]}>
        <ServiceIcon
          list={currentTab === 'airport' ? airportLists : airlineLists}
          menu={menu}
          onMenuPress={_menu => setMenu(_menu)}
        />
        <View style={{marginTop: 15, marginBottom: 20, marginHorizontal: 5}}>
          <ThinBar />
        </View>
      </View>
      <FlatList
        renderItem={({item}) => (
          <View style={[styleReview.container]}>
            <ReviewCard data={item} currentTab={currentTab} />
          </View>
        )}
        ListFooterComponent={<View style={{height: 70, flex: 1}} />}
        keyExtractor={item => item.uid}
        data={currentTab === 'airport' ? airportReview : airlineReview}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchReviewScroll()}
        ListHeaderComponent={
          <View style={styles.Scrollview}>
            <View style={styleBody.line} />
            {/* 서비스 상세정보 */}
            <View style={styleBody.container}>
              <ServiceCard data={detail} type={currentTab} />
            </View>
            <View style={styleBody.lineReview} />
            {/* 리뷰 정보 */}
            <View style={styleReview.titleContainer}>
              <FontText style={styleReview.title}>{`항공사 리뷰(${
                currentTab === 'airport'
                  ? airportReview.length
                  : airlineReview.length
              })`}</FontText>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styleReview = StyleSheet.create({
  container: {paddingHorizontal: 30},
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
  },
  titleContainer: {
    marginHorizontal: 5,
    marginBottom: 15,
  },
});
const styleBody = StyleSheet.create({
  icon: {
    marginTop: 26,
    // paddingLeft: 20,
  },
  line: {},
  lineReview: {
    borderWidth: 0.5,
    borderColor: '#DEDEDE',
    marginTop: 25,
    marginBottom: 30,
    marginHorizontal: 5,
  },
  container: {
    minHeight: 314,
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
    elevation: 5,
    margin: 5,
  },
});
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Scrollview: {
    paddingHorizontal: 25,
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  icon: {
    color: 'black',
  },
  tabText: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 23,
    color: '#979797',
  },
  activeText: {
    fontWeight: '700',
    color: '#0066FF',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  bar: {
    width: 2,
    height: 21,
    backgroundColor: '#DEDEDE',
    marginHorizontal: 13,
  },
});
