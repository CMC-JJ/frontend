import {View, StyleSheet, Platform, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack, TabHeader} from '@/components';
import DropDownItem from '@/components/DropDownItem';
import {ThinBar} from '@/components/BarSeparator';

export function QuestionScreen() {
  const data = useMemo(
    () => [
      {
        id: 1,
        title: '제가 찾는 서비스가 보이지않아요.',
        body: '‘가치가자’ 서비스는 교통약자 서비스를 빠르고 편리하게 이용하기 위해 제작된 서비스 입니다.\n찾으시는 서비스가 교통약자 관련 서비스가 아닐 경우, 가치가자에서 원하시는 서비스를 찾지 못하실 수 있습니다.',
      },
      {
        id: 2,
        title: '친구가 저를 등록할 수 없다고 해요.',
        body: '마이페이지 > 내 프로필 공개를 설정하지 않으신 경우, 다른 사람에게 나의 프로필이 보여지지 않습니다.\n해당 기능의 설정을 확인해주세요.',
      },
      // {
      //   id: 3,
      //   title: '다른 사람에게 저를 보여주고 싶지 않아요.',
      //   body: 'ss',
      // },
      {
        id: 4,
        title: '여행 일정이 바뀌었는데 어떡하나요?',
        body: '일정 > 등록한 일정 에서 날짜와 여행 이름, 이용하고 싶은 서비스를 수정하실 수 있습니다.',
      },
      {
        id: 5,
        title: '이용이 제한되는 사유는 어떤 것이 있나요?',
        body: '이용 약관에 따라 서비스에 해를 끼치는 행위, 위치정보를 수집해 타인에게 피해를 가하는 행위 등의 이유로 가치가자 서비스의 이용이 제한됩니다.\n자세한 내용은 이용약관을 확인해주세요.',
      },
    ],
    [],
  );
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <TabHeader text={'자주 묻는 질문'} />
      <View style={styles.form}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <>
              <ThinBar />
              <DropDownItem title={item.title} text={item.body} />
            </>
          )}
          keyExtractor={item => item.id.toString()}
        />
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
  form: {
    marginTop: 25,
  },
});
