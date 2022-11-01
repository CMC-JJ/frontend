import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {useAuthStore} from '../store';
// import {request} from '../utils';

export function ServiceScreen() {
  // const {auth} = useAuthStore();
  // console.log(auth.jwtToken);
  // const airpostList = async () =>
  //   await request('web/airports', {Authorization: auth.jwtToken}, 'GET').then(
  //     e => console.log(e),
  //   );
  // useEffect(() => {
  //   airpostList();
  // }, []);
  return (
    <SafeAreaView>
      <Text>서비스</Text>
      {/* <Button title={'버튼'} onPress={airpostList}></Button> */}
    </SafeAreaView>
  );
}
