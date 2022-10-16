import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {request} from '../utils';

export const useIdCheck = (userName: string) => {
  const [isIdValid, setIsIdValid] = useState<boolean>(false);
  const [isDuplicatedCheckCompleted, setIsDuplicatedCheckCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    if (userName.length >= 1 && userName.length <= 15) {
      setIsIdValid(true);
    } else {
      setIsIdValid(false);
    }

    setIsDuplicatedCheckCompleted(false);
  }, [userName.length]);

  const onPressDuplicateId = async () => {
    const result = await request(
      'web/auth/duplicate-id',
      {userName: userName},
      'GET',
    );

    if (!result.isSuccess) {
      Alert.alert('이미 존재하는 아이디입니다.');
    } else {
      setIsDuplicatedCheckCompleted(true);
      Alert.alert('사용 가능한 아이디입니다.');
    }
  };

  return {isIdValid, isDuplicatedCheckCompleted, onPressDuplicateId};
};
