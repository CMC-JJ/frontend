import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/screens';
import {ArrowBack, SignButton} from '@/components';
import FontText from '@/components/FontText';
import {reviewReportList} from '@/utils/fetch';
import {ThinBar} from '@/components/BarSeparator';

function RadioButton({menu, onMenuPress, reportList, setText}: any) {
  return (
    <>
      {reportList &&
        reportList.map((v: any) => (
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onMenuPress?.(v)}
              key={v.id}>
              {menu?.id === v.id ? (
                <Image
                  style={styles.icon}
                  source={require('@/assets/images/onRadio.png')}
                />
              ) : (
                <Image
                  style={styles.icon}
                  source={require('@/assets/images/offRadio.png')}
                />
              )}
              <FontText style={styles.buttonText}>{v.name}</FontText>
            </TouchableOpacity>
            <View>
              {reportList.length !== v.id ? (
                <ThinBar />
              ) : (
                <TextInput
                  multiline={true}
                  onChangeText={text => setText(text)}
                  editable={reportList.length === v.id ? true : false}
                  placeholder="신고 사유를 입력해주세요"
                  style={styles.inputForm}
                />
              )}
            </View>
          </View>
        ))}
    </>
  );
}
type ReportCompleteRouteProp = RouteProp<RootStackParamList, 'Report'>;
export function ReportScreen() {
  const {params} = useRoute<ReportCompleteRouteProp>();
  const [menu, setMenu] = useState();
  const [reportList, setReportList] = useState();
  const [text, setText] = useState();
  useEffect(() => {
    console.log('menu', menu);
    params.id;
    console.log('text', text);
  }, [menu, params.id, text]);

  useEffect(() => {
    reviewReportList().then(list => {
      setReportList(list);
    });
  }, []);
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
            작성자 및 리뷰내용 신고
          </FontText>
        </View>
      </View>
      <View>
        <RadioButton
          menu={menu}
          onMenuPress={(_menu: any) => setMenu(_menu)}
          reportList={reportList}
          setText={(_text: any) => setText(_text)}
        />
      </View>
      <View style={styles.submit}>
        <SignButton style={{width: '100%'}} buttonText={'신고하기'} isValid />
      </View>
    </SafeAreaView>
  );
}
// const res =
//   currentTab === 'airport'
//     ? reportAirportReview(data?.airportReviewdId)
//     : reportAirlineReview(data?.airlineReviewdId);
// console.log(res);
const styles = StyleSheet.create({
  fill: {flex: 1, backgroundColor: 'white'},
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 33,
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    paddingVertical: 14,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 17,
    lineHeight: 24,
  },
  icon: {},
  inputForm: {
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 160,
    borderRadius: 12,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 25,
    backgroundColor: 'white',
  },
  submit: {
    position: 'absolute',
    bottom: 34,
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 25,
  },
});
