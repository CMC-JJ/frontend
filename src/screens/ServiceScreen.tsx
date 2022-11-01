import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontText from '../components/FontText';
import Icon from 'react-native-vector-icons/AntDesign';
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
  const [currentTab, setCurrentTab] = useState<'airline' | 'airport'>(
    'airline',
  );

  const isCurrentRegisteredTabActive = currentTab === 'airline';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <FontText style={styles.title}>항공서비스</FontText>
        <Icon style={styles.icon} name="search1" size={18} color="gray" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // style={[styles.button]}
          onPress={() => {
            setCurrentTab('airline');
          }}>
          <FontText
            style={[
              styles.tabText,
              isCurrentRegisteredTabActive && styles.activeText,
            ]}>
            공항
          </FontText>
        </TouchableOpacity>
        <View style={styles.bar} />
        <TouchableOpacity
          // style={/[styles.button]}
          onPress={() => {
            setCurrentTab('airport');
          }}>
          <FontText
            style={[
              styles.tabText,
              !isCurrentRegisteredTabActive && styles.activeText,
            ]}>
            항공사
          </FontText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.allShow}>
          <FontText style={styles.allShowText}>전체보기</FontText>
        </TouchableOpacity>
      </View>
      {/* <Button title={'버튼'} onPress={airpostList}></Button> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
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
    paddingVertical: 20,
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
    justifyContent: 'center',
  },
  allShowText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
  },
});
