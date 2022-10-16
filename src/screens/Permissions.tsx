import {Button, Platform, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
// import Icon from 'react-native-vector-icons/MaterialIcons';
export default function Permissions() {
  const requestMultiplePermissions = () => {
    if (Platform.OS === 'ios') {
      requestMultiple([
        // PERMISSIONS.IOS.FACE_ID,
        PERMISSIONS.IOS.CONTACTS,
      ]).then(response => {
        console.log('CONTACTS', response[PERMISSIONS.IOS.CONTACTS]);
      });
    } else if (Platform.OS === 'android') {
      requestMultiple([PERMISSIONS.ANDROID.CALL_PHONE]).then(response => {
        console.log('A MULTIPLE REQUEST RESPONSE : ', response);
      });
    }
  };
  // const checkMultiplePermissions = () => {
  //   checkMultiple([PERMISSIONS.IOS.CONTACTS, PERMISSIONS.IOS.CAMERA]).then(
  //     response => {
  //       console.log('MULTIPLE CHECK RESPONSE : ', response);
  //     },
  //   );
  // };
  useEffect(() => {
    checkMultiple([PERMISSIONS.IOS.CONTACTS, PERMISSIONS.IOS.CAMERA]).then(
      response => {
        console.log('MULTIPLE CHECK RESPONSE : ', response);
      },
    );
  }, []);

  return (
    <>
      <View>
        <Text>접근 권한 승인</Text>
        <Text>해당 서비스 이용을 위한 접근 권한을 허용합니다.</Text>
        <View>
          <View>
            {/* <Icon name="phone-portrait" size={22} color="gray" /> */}
            <Text>연락처 접근 권한을 허용합니다.</Text>
          </View>
          <View>
            {/* <Icon name="camera" size={22} color="gray" /> */}
            <Text>카메라 접근 권한을 허용합니다.</Text>
          </View>
          <View>
            {/* <Icon name="book" size={22} color="gray" /> */}
            <Text>갤러리 접근 권한을 허용합니다.</Text>
          </View>
          <View>
            {/* <Icon name="mic" size={22} color="gray" /> */}
            <Text>마이크 접근 권한을 허용합니다.</Text>
          </View>
          <Button
            onPress={() => requestMultiplePermissions()}
            title="권한 허용"
          />
        </View>
      </View>
    </>
  );
}

// const styles = StyleSheet.create({});
