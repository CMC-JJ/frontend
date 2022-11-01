import {useEffect, useState} from 'react';
import {AUTH_NUMBER_LENGTH} from '@/constants';
import {isValidNumberLength} from '@/utils';

export const useVerifyCode = () => {
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [isVerifyCodeValid, setIsVerifyCodeValid] = useState<boolean>(false);

  useEffect(() => {
    setIsVerifyCodeValid(isValidNumberLength(verifyCode, AUTH_NUMBER_LENGTH));
  }, [verifyCode]);

  return {verifyCode, setVerifyCode, isVerifyCodeValid};
};
