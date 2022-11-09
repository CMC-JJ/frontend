import {request} from './api';

export const reviewDeleteList = async () => {
  try {
    const res = await request('web/infos/user-delete-reasons', {}, 'GET');
    return res.result.userDeleteReasons;
  } catch (e) {
    console.log('리뷰신고리스트 가져오기 실패', e);
  }
};

export const accountDelete = async (userId: number, deleteId: number) => {
  console.log(userId);
  console.log(deleteId);
  try {
    const res = await request(
      'web/users/status',
      {userId: userId, userDeleteReasonId: deleteId},
      'PATCH',
    );
    return res.message;
  } catch (e) {
    console.log('계정삭제 실패', e);
  }
};

export const changeNickName = async (userId: number, nickName: string) => {
  console.log(userId, nickName);
  try {
    const res = await request(
      'web/users',
      {userId: userId, nickName: nickName},
      'PATCH',
    );
    return res;
  } catch (e) {
    console.log('닉네임 바꾸기 실패', e);
  }
};

export const validationPassword = async (password: string) => {
  try {
    const res = await request(
      'web/auth/password/',
      {
        password: password,
      },
      'GET',
    );
    console.log(res);
    return res.isSuccess;
  } catch (e) {
    console.log('비밀번호 검증 실패', e);
  }
};

export const changePassword = async (userId: number, password: string) => {
  try {
    const res = await request(
      'web/auth/password/',
      {
        userId: userId,
        password: password,
      },
      'PATCH',
    );
    console.log(res);
    return res.isSuccess;
  } catch (e) {
    console.log('비밀번호 변경 실패', e);
  }
};
