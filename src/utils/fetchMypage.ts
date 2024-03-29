import {request} from './api';
import {nanoid} from 'nanoid/non-secure';
export const reviewDeleteList = async () => {
  try {
    const res = await request('web/infos/user-delete-reasons', {}, 'GET');
    return res.result.userDeleteReasons;
  } catch (e) {
    console.log('리뷰신고리스트 가져오기 실패', e);
  }
};

export const accountDelete = async (userId: number, deleteId: number) => {
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
    return res.isSuccess;
  } catch (e) {
    console.log('비밀번호 변경 실패', e);
  }
};
export const ownReviewList = async (userId: number) => {
  try {
    const res = await request(`web/users/${userId}/reviews`, {}, 'GET');
    return res.result.userReviews.map((v: any) => ({...v, uid: nanoid()}));
  } catch (e) {
    console.log('내 리뷰 가져오기 실패', e);
  }
};

export const ownReviewAirlineDelete = async (reviewId: number) => {
  try {
    const res = await request(
      'web/airlines/reviews/status',
      {
        airlineReviewId: reviewId,
      },
      'PATCH',
    );
    return res;
  } catch (e) {
    console.log('airline리뷰 삭제 실패', e);
  }
};

export const ownReviewAirportDelete = async (reviewId: number) => {
  try {
    const res = await request(
      'web/airports/reviews/status',
      {
        airportReviewId: reviewId,
      },
      'PATCH',
    );
    return res;
  } catch (e) {
    console.log('airline리뷰 삭제 실패', e);
  }
};
