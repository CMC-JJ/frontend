import React, {ComponentProps, useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontText from '@/components/FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import ServiceIcon from '@/components/service/ServiceIcon';
import {AirDetailProps, ServiceCard} from '@/components/service/ServiceCard';
import {
  fetchAirlineLists,
  fetchAirlinesDetail,
  fetchAirportLists,
  fetchAirportsDetail,
} from '@/utils/fetch';
import {RootStackNavigationProp} from '@/screens';
import {useNavigation} from '@react-navigation/native';

export interface AirServiceProps
  extends ComponentProps<typeof TouchableOpacity> {
  id: number;
  name: string;
  logoImageUrl?: string;
  region?: string;
  onClick: boolean;
}
export function ServiceScreen() {
  // const {auth} = useAuthStore();
  const [airlineLists, setAirlineLists] = useState<AirServiceProps[]>([]);
  const [airportLists, setAirportLists] = useState<AirServiceProps[]>([]);
  const [currentTab, setCurrentTab] = useState<'airport' | 'airline'>(
    'airport',
  );
  const [menu, setMenu] = useState<AirServiceProps | null>(null);
  const [detail, setDetail] = useState<AirDetailProps | null>(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  useEffect(() => {
    if (menu) {
      switch (currentTab) {
        case 'airline':
          if (airlineLists) {
            fetchAirlinesDetail(menu).then(_detail => setDetail(_detail));
          }
          break;
        case 'airport':
          if (airportLists) {
            fetchAirportsDetail(menu).then(_detail => setDetail(_detail));
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

  return (
    <SafeAreaView style={styles.fill}>
      <ScrollView
        style={styles.Scrollview}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <FontText
            style={[
              styles.title,
              Platform.OS === 'android' && {fontWeight: '900'},
            ]}>
            항공서비스
          </FontText>
          {/* <TabHeader text="항공서비스" /> */}
          <TouchableOpacity onPress={() => navigation.navigate('AirSearch')}>
            <Icon style={styles.icon} name="search1" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // style={[styles.button]}
            onPress={() => setCurrentTab('airport')}>
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
          <TouchableOpacity style={styles.allShow}>
            <FontText style={styles.allShowText}>전체보기</FontText>
          </TouchableOpacity>
        </View>

        {/* 아이콘&이름 */}
        <View style={styleBody.icon}>
          <ServiceIcon
            list={currentTab === 'airport' ? airportLists : airlineLists}
            menu={menu}
            onMenuPress={_menu => setMenu(_menu)}
          />
        </View>
        <View style={styleBody.line} />
        {/* 서비스 상세정보 */}
        <View style={styleBody.container}>
          <ServiceCard data={detail} type={currentTab} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styleBody = StyleSheet.create({
  icon: {
    marginTop: 26,
  },
  line: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginTop: 15,
    marginBottom: 25,
    margin: 5,
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
    fontWeight: '600',
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
    fontWeight: '600',
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
  allShow: {
    width: 76,
    height: 26,
    borderRadius: 12,
    backgroundColor: 'black',
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  allShowText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
  },
});
