import {
  StyleSheet,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  checkPermissionsANDROID,
  checkPermissionsIOS,
} from '@/hooks/CheckPermission';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '@/screens';
import FontText from '@/components/FontText';
import {PermissionForm} from '@/components';
export function PermissionScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const requestMultiplePermissions = async () => {
    if (Platform.OS === 'ios') {
      await requestMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.CONTACTS,
      ]).then(res => {
        checkPermissionsIOS(res);
        navigation.navigate('OnBoarding');
      });
    } else if (Platform.OS === 'android') {
      await requestMultiple([
        PERMISSIONS.ANDROID.CALL_PHONE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]).then(res => {
        checkPermissionsANDROID(res);
        navigation.navigate('OnBoarding');
      });
    }
  };

  const checkMultiplePermissions = async () => {
    if (Platform.OS === 'ios') {
      await checkMultiple([
        PERMISSIONS.IOS.CONTACTS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ]).then(res => {
        checkPermissionsIOS(res);
        console.log('체크해요 : ', res);
      });
    } else if (Platform.OS === 'android') {
      await checkMultiple([
        PERMISSIONS.ANDROID.CALL_PHONE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]).then(res => {
        checkPermissionsANDROID(res);
        console.log('체크해요 : ', res);
      });
    }
  };

  useEffect(() => {
    //훅으로 뺄 예정
    checkMultiplePermissions();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.logo}>
        {/* <Image source={require('../assets/images/logo_sub.png')} />
        <Image
          style={{resizeMode: 'stretch'}}
          source={require('../assets/images/test.png')}
        /> */}
        <Image
          style={styles.logo}
          source={require('@/assets/images/permissionImage.png')}
        />
      </View>
      <View style={styles.container}>
        <View>
          <View style={styles.textForm}>
            <FontText style={styles.title}>앱 이용 안내</FontText>
            <FontText style={styles.subtitle}>필수적 접근 권한</FontText>
            <FontText style={styles.grayFont}>
              허용 거부 시 가치가자 서비스를 이용할 수 없습니다.
            </FontText>
          </View>
          <View style={styles.permissionForm}>
            <PermissionForm
              title={'통화권한'}
              subtitle={'앱 내에서 상대방과 통화 서비스를 제공합니다.'}
              iconName={'call-outline'}
            />
            <PermissionForm
              title={'위치정보'}
              subtitle={
                '현재 위치를 기반으로 나의 위치를 상대방에게 제공합니다.'
              }
              iconName={'location-outline'}
              detailInfo={'위치기반 서비스 이용약관 자세히 보기'}
            />
          </View>

          <FontText style={styles.grayFont}>
            * 설정 {'>'} 애플리케이션 {'>'} 가치가자 {'>'} 권한 메뉴에서도
            설정하실 수 있습니다.
          </FontText>
        </View>

        <TouchableOpacity
          onPress={() => requestMultiplePermissions()}
          style={styles.button}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 15,
    color: '#121212',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
    color: '#121212',
  },
  grayFont: {color: '#63666A', fontWeight: '400'},
  logo: {
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textForm: {
    marginBottom: 30,
  },
  permissionForm: {
    marginBottom: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});