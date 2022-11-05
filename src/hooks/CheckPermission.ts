import {Permission} from '@/store';
import {Platform} from 'react-native';
import {checkMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkPermissionsIOS = async (res: any) => {
  if (
    res['ios.permission.CONTACTS'] === 'granted' &&
    res['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted'
  ) {
    Permission.setState({
      permissionAllow: {
        allow: true,
      },
      permissionInfo: {
        location: res['ios.permission.LOCATION_WHEN_IN_USE'],
      },
    });
    return true;
    //다음페이지로 이동
  } else {
    Permission.setState({
      permissionAllow: {
        allow: false,
      },
      permissionInfo: {
        location: res['ios.permission.LOCATION_WHEN_IN_USE'],
      },
    });
    return false;
    //설정으로 접속되어 권한 허용 재요청
  }
};

export const checkPermissionsANDROID = async (res: any) => {
  if (
    res['android.permission.CALL_PHONE'] === RESULTS.GRANTED &&
    res['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED
  ) {
    Permission.setState({
      permissionAllow: {
        allow: true,
      },
      permissionInfo: {
        location: res['ios.permission.LOCATION_WHEN_IN_USE'],
      },
    });
    return true;
  } else {
    Permission.setState({
      permissionAllow: {
        allow: false,
      },
      permissionInfo: {
        location: res['ios.permission.LOCATION_WHEN_IN_USE'],
      },
    });
    return false;
  }
};

export const checkMultiplePermissions = async () => {
  if (Platform.OS === 'ios') {
    await checkMultiple([
      PERMISSIONS.IOS.CONTACTS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]).then(res => {
      checkPermissionsIOS(res);
    });
  } else if (Platform.OS === 'android') {
    await checkMultiple([
      PERMISSIONS.ANDROID.CALL_PHONE,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(res => {
      checkPermissionsANDROID(res);
    });
  }
};
