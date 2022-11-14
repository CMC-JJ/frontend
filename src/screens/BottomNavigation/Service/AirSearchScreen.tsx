import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack} from '@/components';
import {FontText} from '@/components/FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import {request} from '@/utils';
import AirCard from '@/components/service/AirCard';
export interface AirCardProps {
  id: number;
  name: string;
  avgReview: string;
  logoImageUrl?: string;
  customerServiceNumber: string;
  website: string;
}
export function AirSearchScreen() {
  const [value, onChangeText] = useState<String>();
  const [data, setData] = useState();
  const fetchSearch = async () => {
    try {
      const res = await request('web/search', {searchQuery: value}, 'GET');
      console.log(res.result.searchResult);
      setData(res.result.searchResult[0]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      {/* <FormHeader text={'공항, 항공사를 검색해주세요'} /> */}
      <FontText style={styles.header}>공항, 항공사를 검색해주세요</FontText>
      <View style={styles.container}>
        <View style={styles.inputForm}>
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            blurOnSubmit={true}
            placeholder={'검색어를 입력해주세요'}
            onSubmitEditing={() => console.log('first')}
          />
          <TouchableOpacity onPress={fetchSearch}>
            <Icon name="search1" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>{data && <AirCard data={data} />}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 15,
    fontWeight: '600',
    fontSize: 26,
  },
  container: {
    flex: 3,
    marginTop: 30,
    paddingHorizontal: 25,
  },
  inputForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 43,
    width: '100%',
    height: 31,
    marginBottom: 30,
  },
  input: {
    padding: 0,
    margin: 0,
    paddingLeft: 18,

    fontSize: 15,
    width: '80%',
  },
  card: {},
});
