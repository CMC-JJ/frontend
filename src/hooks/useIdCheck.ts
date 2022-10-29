import {useEffect, useState} from 'react';

export const usePasswordCheck = (password: string, confirmPassword: string) => {
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
    const isValidPassword = passwordRegex.test(password);

    if (isValidPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);

  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(false);

  useEffect(() => {
    if (password === confirmPassword && confirmPassword.length > 0) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  }, [confirmPassword, password]);

  return {isPasswordValid, isConfirmPasswordValid};
};
