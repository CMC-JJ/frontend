import {BasicType, CommonReviewType} from './common';

export type UserReviewListItem = BasicType &
  CommonReviewType & {
    region?: string;
    logoImageUrl?: string;
    reviewedAirportServices?: string[];
    reviewedAirlineServices?: string[];
    type: 'AIRPORT' | 'AIRLINE';
  };
