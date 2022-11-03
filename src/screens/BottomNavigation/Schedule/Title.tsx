import {ArrowBack, BottomBorderedInput, SignButton} from '@/components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScheduleNavigationProp} from './ScheduleStack';

export function Title() {
  const navigation = useNavigation<ScheduleNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {display: 'none'},
      });
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: [
            {
              position: 'absolute',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: '#ffffff',
              shadowColor: 'rgba(0, 0, 0, 0.25)',
              shadowOffset: {width: 0, height: -3},
              shadowOpacity: 0.5,
              elevation: 10,
            },
            Platform.OS === 'ios' && {height: 96},
          ],
        });
      };
    }, [navigation]),
  );

  const [title, setTitle] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(title.trim().length >= 1);
  }, [title]);

  const onPress = () => {
    navigation.navigate('Date');
  };

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.back}>
        {Platform.OS === 'ios' && <ArrowBack size={28} />}
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.header,
              Platform.OS === 'android' && {fontWeight: '900'},
            ]}>
            {'가치가자와\n함께 떠나요'}
          </Text>
        </View>
        <Text style={styles.subheader}>어떤 여행을 떠나시나요?</Text>
        <View style={styles.inputContainer}>
          <BottomBorderedInput
            value={title}
            isCharacterExisted={title.length > 0}
            onChangeText={setTitle}
            placeholder="10자 이내 작성"
            returnKeyType="done"
          />
        </View>
        <View style={styles.footer}>
          <SignButton isValid={isValid} buttonText="다음" onPress={onPress} />
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
  back: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  headerContainer: {
    marginTop: 25,
  },
  header: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 34,
    color: 'black',
  },
  subheader: {
    marginTop: 11,

    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
    color: 'black',
  },
  inputContainer: {
    marginTop: 58,
  },
  footer: {
    flex: 1,

    marginBottom: 34,
    justifyContent: 'flex-end',
  },
});
