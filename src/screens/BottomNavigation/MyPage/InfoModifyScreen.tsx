import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {ArrowBack, BottomBorderedInput} from '@/components';
import {FontText} from '@/components/FontText';
import {useNavigation, useRoute} from '@react-navigation/native';
import {InfoDetailCompleteRouteProp} from './MyPageScreen';
import {changeNickName} from '@/utils/fetchMypage';
import {MypageNavigationProp} from './MyPageStack';
import {useAuthStore} from '@/store';
// import {useAuthStore} from '@/store';

export default function InfoModifyScreen() {
  const {params} = useRoute<InfoDetailCompleteRouteProp>();
  const [nickName, setNickName] = useState<string>(params.auth.nickName);
  const [isNickNameValid, setIsNickNameValid] = useState<boolean>(false);
  const navigation = useNavigation<MypageNavigationProp>();
  const {setOnlyNickName} = useAuthStore();

  const regex = useMemo(() => /^[가-힣]+$/, []);
  useEffect(() => {
    if (nickName.length < 2 || !regex.test(nickName)) {
      setIsNickNameValid(false);
    } else {
      setIsNickNameValid(true);
    }
  }, [nickName, regex]);

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
            내 정보
          </FontText>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.userImg}>
          <Image source={require('@/assets/images/userImg.png')} />
        </View>

        <FontText style={styles.title}>닉네임</FontText>
        <View style={styles.nickNameForm}>
          <BottomBorderedInput
            isCharacterExisted={nickName.length > 0}
            value={nickName}
            hasMarginBottom
            onChangeText={setNickName}
            placeholder="닉네임(한글 2자 이상)"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.duplicateId}
            isValid={nickName.length > 0 ? isNickNameValid : true}
          />

          <TouchableOpacity
            disabled={!isNickNameValid}
            style={[
              styles.buttonContainer,
              Platform.OS === 'android' && {marginTop: 10},
            ]}
            onPress={() => {
              changeNickName(params.auth.userId, nickName).then(res => {
                console.log(res);
                res && setOnlyNickName(nickName);

                navigation.navigate('Home');
              });
            }}>
            <View
              style={[isNickNameValid ? styles.button : styles.blockButton]}>
              <FontText
                style={[
                  styles.buttonText,
                  !isNickNameValid && {color: 'black'},
                ]}>
                수정
              </FontText>
            </View>
          </TouchableOpacity>
        </View>
        <FontText style={[styles.title, {top: -20}]}>전화번호</FontText>
        <View style={{top: -20}}>
          <FontText style={styles.phoneText}>
            {params.auth.phoneNumber}
          </FontText>
          <View style={styles.line} />
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  userImg: {
    marginTop: 46,
    alignItems: 'center',
    marginBottom: 57,
  },
  form: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 0,
  },
  validNickName: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 34,
    color: '#0066FF',
    textAlign: 'right',
  },
  warning: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 34,
    color: '#FF0000',
    textAlign: 'right',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7C7C7C',
    marginBottom: 9,
  },
  buttonContainer: {
    flex: 0.25,
  },
  button: {
    backgroundColor: '#0066FF',
    overflow: 'hidden',
    borderRadius: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockButton: {
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
    borderRadius: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  nickNameForm: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  duplicateId: {
    flex: 0.65,
  },
  line: {
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,
    color: 'black',
  },
  phoneText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 20,

    paddingBottom: 10,
    paddingLeft: -5,
  },
});
