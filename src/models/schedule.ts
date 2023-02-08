import type {AirlineDetail, AirportDetail} from './';

export type ScheduleAirportService = {
  airportServiceId: number;
  name: string;
  website: string;
};

export type ScheduleAirlineService = {
  airlineServiceId: number;
  name: string;
  website: string;
};

export type Schedule = {
  scheduleId: number;
  scheduleName: string;
  startAt: string;
  leftDay: string;
  departureAirportId: number;
  departureAirportName: string;
  arrivalAirportId: number;
  arrivalAirportName: string;
  airlineId: number;
  airlineName: string;
  departureAirportService: ScheduleAirportService[];
  arrivalAirportService: ScheduleAirportService[];
  airlineService: ScheduleAirlineService[];
};

export type ScheduleListItem = Omit<
  Schedule,
  'departureAirportService' | 'arrivalAirportService' | 'airlineService'
> & {
  reviewStatus: string;
};

export type ScheduleDetail = Schedule & {
  departureAirportRegion: string;
  departureAirportCustomerServiceNumber: string;
  departureAirportWebsite: string;
  departureAirportAvgReview: string;
  arrivalAirportRegion: string;
  arrivalAirportCustomerServiceNumber: string;
  arrivalAirportWebsite: string;
  arrivalAirportAvgReview: string;
  logoImageUrl: string;
  airlineCustomerServiceNumber: string;
  airlineWebsite: string;
  airlineAvgReview: string;
};

type ScheduleReviewAirportService = Omit<ScheduleAirportService, 'website'>;
type ScheduleReviewAirlineService = Omit<ScheduleAirlineService, 'website'>;

type ScheduleReviewAirport = Pick<
  AirportDetail,
  'airportId' | 'airportName'
> & {
  region: string;
  airportServices: ScheduleReviewAirportService[];
  reviewStatus: string;
};

type ScheduleReviewAirline = Pick<
  AirlineDetail,
  'airlineId' | 'airlineName'
> & {
  logoImageUrl: string;
  airlineService: ScheduleReviewAirlineService[];
  reviewStatus: string;
};

export type ScheduleReview = {
  departureAirport: ScheduleReviewAirport;
  arrivalAirport: ScheduleReviewAirport;
  airline: ScheduleReviewAirline;
};
