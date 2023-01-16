import {BasicType, CommonReviewType} from './common';

export type Airline = BasicType & {
  logoImageUrl: string;
  website: string;
};

export type AirlineListItem = Omit<Airline, 'website'>;

export type AirlineServiceListItem = Pick<Airline, 'id' | 'name'>;

export type AirlineDetailServiceItem = Omit<Airline, 'logoImageUrl'>;

export type AirlineDetail = {
  airlineId: number;
  airlineName: string;
  customerServiceNumber: string;
  website: string;
  avgReview: string;
  availableAt: string;
  airlineServices: AirlineDetailServiceItem[];
};

export type AirlineReviewListItem = CommonReviewType & {
  airlineReviewId: number;
  nickName: string;
  reviewedAirlineServices: string[];
};
