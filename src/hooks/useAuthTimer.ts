import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {AUTHENTICATION_TIME} from '../constants';

export const useAuthTimer = (
  isSuccess: boolean,
  didPressAuthButton: boolean,
) => {
  const [time, setTime] = useState<number>(AUTHENTICATION_TIME);

  useEffect(() => {
    if (didPressAuthButton) {
      if (time > 0) {
        const interval = setInterval(() => {
          setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [didPressAuthButton, time]);

  useEffect(() => {
    if (time > 0) {
      return;
    }
    if (isSuccess) {
      return;
    }
    Alert.alert('인증시간이 만료되었습니다. 다시 인증해주세요.');
  }, [isSuccess, time]);

  return {time, setTime};
};
