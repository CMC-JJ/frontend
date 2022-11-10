import {useEffect, useState} from 'react';

export const usePasswordChangeCheck = (
  password: string,
  confirmPassword: string,
) => {
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
  const isValidPassword = passwordRegex.test(password);

  useEffect(() => {
    if (isValidPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [isValidPassword, password, confirmPassword]);

  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>();

  useEffect(() => {
    if (password === confirmPassword && confirmPassword.length > 0) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  }, [confirmPassword, isConfirmPasswordValid, password]);

  return {isPasswordValid, isConfirmPasswordValid};
};
