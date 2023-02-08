/**
 * 백엔드 API의 기본타입
 */
export type BasicType = {
  id: string;
  name: string;
};

/**
 * 리뷰에 들어가는 공통 타입
 */
export type CommonReviewType = {
  score: string;
  content: string;
  createdAt: string;
};
