import {useEffect, useState} from 'react';
import {PHONE_NUMBER_LENGTH} from '../constants';
import {isValidNumberLength} from '../utils';

export const useIsPhoneNumberValid = (phoneNumber: string) => {
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);

  useEffect(() => {
    setIsPhoneNumberValid(
      isValidNumberLength(phoneNumber, PHONE_NUMBER_LENGTH),
    );
  }, [phoneNumber]);

  return isPhoneNumberValid;
};
