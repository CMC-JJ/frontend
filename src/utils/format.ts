export const dateFormat = (date: Date) =>
  date.getFullYear() +
  '-' +
  (date.getMonth() + 1 < 9
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1) +
  '-' +
  (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());

export const formatDateText = (date: string) => {
  if (date === '') {
    return '';
  }

  const result = date.split('-');
  return `${result[0].slice(2)}.${result[1]}.${result[2]}`;
};

export const formatTimeText = (date: Date) => {
  const today = date;

  const hours = today.getHours();
  const minutes = today.getMinutes();

  return `${hours <= 12 ? hours : hours - 12}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
};

export const formatTimeTo12 = (time: string) => {
  const result = time.split(':');
  const hour = parseInt(result[0]);
  const minute = parseInt(result[1]);

  return `${hour <= 12 ? hour : hour - 12}:${
    minute < 10 ? '0' + minute : minute
  }`;
};

export const formatTenDigit = (number: number) => {
  return number < 10 ? '0' + number : number;
};
