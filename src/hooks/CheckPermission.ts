export const checkPermissionsIOS = async (res: any) => {
  if (
    res['ios.permission.CONTACTS'] === 'granted' &&
    res['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted'
  ) {
    console.log('모든권한획득', res);
    return true;
    //다음페이지로 이동
  } else {
    console.log('실패');
    return false;
    //새로고침
  }
};

export const checkPermissionsANDROID = async (res: any) => {
  if (
    res['android.permission.CALL_PHONE'] === 'granted' &&
    res['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
  ) {
    console.log('모든권한획득', res);
    return true;
  } else {
    console.log('거절');
    return false;
  }
};
