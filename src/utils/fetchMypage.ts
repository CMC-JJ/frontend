import {request} from './api';

export const reviewDeleteList = async () => {
  try {
    const res = await request('web/infos/user-delete-reasons', {}, 'GET');
    return res.result.userDeleteReasons;
  } catch (e) {
    console.log('리뷰신고리스트 가져오기 실패', e);
  }
};
