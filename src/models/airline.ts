import {BasicType} from './common';

export type Airline = BasicType & {
  logoImageUrl: string;
  website: string;
};

export type AirlineWithImage = Omit<Airline, 'website'>;
export type AirlineWithWebsite = Omit<Airline, 'logoImageUrl'>;

/* /web/airlines/{airlineId}/services -> 항공사 서비스 리스트 조회 API */
export type AirlineService = {
  id: number;
  name: string;
  website?: string;
};

/* /web/airlines/{airlineId}/services -> 항공사 상세 조회 API */

export type AirlineDetail = {
  airlineId: number;
  airlineName: string;
  customerServiceNumber: string;
  website: string;
  avgReview: string;
  availableAt: string;
  airlineServices: Omit<Airline, 'logoImageUrl'>[];
};

// export type Airline_Detail = {
//   airline: AirlineDetail;
// };

/* /web/airlines/{airlineId}/reviews -> 항공사 리뷰 리스트 조회 API */

export type AirlineReview = {
  airlineReviewId: number;
  nickName: string;
  score: string;
  content: string;
  createdAt: string;
  reviewedAirlineServices: string[];
};

export type AirlineReviewList = {
  total: number;
  airlineReviews: AirlineReview[];
};
