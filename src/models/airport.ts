import type {BasicType, CommonReviewType} from './common';

export type Airport = BasicType & {
  region: string;
  website: string;
};

export type AirportListItem = Omit<Airport, 'website'>;

export type AirportServiceListItem = Pick<Airport, 'id' | 'name'>;

export type AirportDetailServiceItem = Omit<Airport, 'region'>;

export type AirportDetail = {
  airportId: number;
  airportName: string;
  customerServiceNumber: string;
  website: string;
  avgReview: string;
  availableAt: string;
  airportServices: AirportDetailServiceItem[];
};

export type AirportReviewListItem = CommonReviewType & {
  airportReviewId: number;
  nickName: string;
  reviewedAirportServices: string[];
};
