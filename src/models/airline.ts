import {BasicType, CommonReviewType} from './common';

export type AirlineService = BasicType & {
  logoImageUrl: string;
  website: string;
};

export type AirlineListItem = Omit<AirlineService, 'website'>;

export type AirlineServiceListItem = Pick<AirlineService, 'id' | 'name'>;

export type AirlineDetailServiceItem = Omit<AirlineService, 'logoImageUrl'>;

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
