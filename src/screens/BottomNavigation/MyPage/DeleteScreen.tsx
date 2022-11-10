import {Platform, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {InfoDetailCompleteRouteProp} from './MyPageScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowBack, SignButton, TabHeader} from '@/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontText} from '@/components/FontText';
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {MypageNavigationProp} from './MyPageStack';
export default function DeleteScreen() {
  const {params} = useRoute<InfoDetailCompleteRouteProp>();
  const navigation = useNavigation<MypageNavigationProp>();
  const [select, setSelect] = useState<string>('');
  const submit = () => {
    navigation.navigate('DeleteConfirm', {
      userId: params.auth.userId,
      deleteId: Number(select),
    });
  };
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>

      <TabHeader text={'회원탈퇴'} />
      <View style={styles.textForm}>
        <FontText style={styles.title_1}>
          {params.auth.nickName}님과 이별하기 너무 아쉬워요.
        </FontText>
        <View>
          <FontText style={styles.text}>
            계정을 삭제하면 {params.auth.nickName}님의 모든 리뷰 게시글 , 이용
            하신 정보들이 삭제됩니다. 계정 삭제 후 7일간 다시 가입할 수 없어요.
          </FontText>
        </View>
        <FontText style={styles.title_2}>
          {params.auth.nickName}님이 계정을 삭제하는 이유를 알려주세요.
        </FontText>
      </View>
      <View style={styles.picker}>
        <RNPickerSelect
          textInputProps={{underlineColorAndroid: 'transparent'}}
          placeholder={{
            label: '선택해주세요.',
          }}
          fixAndroidTouchableBug={true}
          value={select}
          onValueChange={value => {
            setSelect(value);
          }}
          useNativeAndroidPickerStyle={false}
          items={[
            {
              label: '서비스와 전혀 상관없는 내용이에요',
              value: '1',
              key: '1',
            },
            {label: '자꾸 광고하거나 홍보글을 올려요', value: '2', key: '2'},
            {label: '사실이 아닌 거짓 정보에요', value: '3', key: '3'},
            {label: '마음에 들지 않아요', value: '4', key: '4'},
            {
              label: '이 계정이 다른 계정을 사칭하고 있어요',
              value: '5',
              key: '5',
            },
            {label: '욕설, 혐오, 성적 발언이에요', value: '6', key: '6'},
            {label: '기타', value: '7', key: '7'},
          ]}
          style={pickerSelectStyles}
        />
      </View>
      <View style={{paddingHorizontal: 25}}>
        <View style={styles.line} />
      </View>

      <View style={[styles.button, Platform.OS === 'android' && {bottom: 80}]}>
        <SignButton
          buttonText="다음"
          isValid={select ? true : false}
          onPress={() => submit()}
        />
      </View>
    </SafeAreaView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 19,
    paddingVertical: 8,
    textAlign: 'left',
    fontWeight: '500',
    color: 'black',
    width: wp('100%'),
  },
  inputAndroid: {
    fontSize: 19,
    paddingVertical: 8,
    textAlign: 'left',
    fontWeight: '500',
    color: 'black',
    width: wp('100%'),
  },
});
const styles = StyleSheet.create({
  fill: {flex: 1, backgroundColor: 'white'},
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  textForm: {
    paddingHorizontal: 25,
    width: '100%',
  },
  title_1: {
    fontSize: 18,
    marginTop: 38,
    fontWeight: '700',
    color: '#464646',
  },
  title_2: {
    fontSize: 20,
    fontWeight: '700',
    color: '#464646',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    color: '#464646',
    marginTop: 7,
    marginBottom: 21,
    lineHeight: 23,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 33,
  },
  line: {
    borderWidth: 0.5,
    backgroundColor: 'black',
  },
  button: {
    position: 'absolute',
    bottom: 120,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 25,
  },
});
