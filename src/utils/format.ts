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
