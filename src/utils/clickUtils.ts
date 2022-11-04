import {AirServiceProps} from '@/screens';

//클릭 여부 함수
export const clickState = (v: AirServiceProps, data: any) =>
  data?.map((elem: any) => {
    if (elem.id === v.id) {
      if (elem.onClick === false) {
        elem.onClick = true;
        return elem;
      } else {
        return elem;
      }
    } else {
      elem.onClick = false;
      return elem;
    }
  });
