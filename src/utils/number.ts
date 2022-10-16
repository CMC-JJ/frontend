export const forceNumber = (value: any) => value.replace(/[^0-9]/g, '');

export const convertPhoneNumberFormat = (text: string) =>
  text
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/\-{1,2}$/g, '');

export const isValidNumberLength = (phoneNumber: string, number: number) =>
  phoneNumber.length === number;

export const convertNumberToMMSS = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? `0${sec}` : sec}`;
};
