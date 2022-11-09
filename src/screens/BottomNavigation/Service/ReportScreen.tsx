import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainTabNavigationProp, RootStackParamList} from '@/screens';
import {ArrowBack, SignButton} from '@/components';
import FontText from '@/components/FontText';
import {
  reportAirlineReview,
  reportAirportReview,
  reviewReportList,
} from '@/utils/fetchService';
import {ThinBar} from '@/components/BarSeparator';

function RadioButton({
  menu,
  onMenuPress,
  reportList,
  setText,
  text,
}: {
  menu: ReportReason | undefined;
  onMenuPress: React.Dispatch<React.SetStateAction<ReportReason>>;
  reportList: ReportReason[] | undefined;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
}) {
  return (
    <>
      {reportList &&
        reportList.map((v: ReportReason, i: number) => (
          <View key={i}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onMenuPress?.(v);
                menu && (menu.name === '직접입력' ? setText('') : '');
              }}>
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
                  value={text}
                  multiline={true}
                  onChangeText={_text => setText(_text)}
                  editable={
                    menu !== undefined &&
                    (reportList.length === menu.id ? true : false)
                  }
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
interface ReportReason {
  id: number;
  name: string;
}
export function ReportScreen() {
  const {params} = useRoute<ReportCompleteRouteProp>();
  const [menu, setMenu] = useState<ReportReason>({id: 0, name: ''});
  const [reportList, setReportList] = useState<ReportReason[]>();
  const [text, setText] = useState<string>('');
  const navigation = useNavigation<MainTabNavigationProp>();
  useEffect(() => {
    reviewReportList().then(list => {
      setReportList(list);
    });
  }, []);

  const submit = () => {
    if (menu) {
      (params.type === 'airport'
        ? reportAirportReview(params.id, menu.id, text)
        : reportAirlineReview(params.id, menu.id, text)
      ).then(res =>
        res
          ? Alert.alert('\n신고가 접수되었습니다.\n ', '', [
              {
                text: '확인',
                onPress: () => navigation.navigate('Service'),
              },
            ])
          : Alert.alert('\n오류가 발생했습니다.\n다시 시도해주세요.\n'),
      );
    }
  };
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
      {/* <View> */}
      <RadioButton
        menu={menu}
        onMenuPress={_menu => {
          setMenu(_menu);
        }}
        reportList={reportList}
        setText={_text => setText(_text)}
        text={text}
      />
      {/* </View> */}
      <View style={styles.submit}>
        <SignButton buttonText={'신고하기'} isValid onPress={() => submit()} />
      </View>
    </SafeAreaView>
  );
}

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
    height: 130,
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
