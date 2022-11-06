import {AirServiceProps} from '@/screens';
import {request} from './api';
import {nanoid} from 'nanoid/non-secure';

export const fetchAirportLists = async () => {
  try {
    const res = await request('web/airports', {}, 'GET');
    return res.result.airports;
  } catch (e) {
    console.log('error', e);
  }
};
export const fetchAirlineLists = async () => {
  try {
    const res = await request('web/airlines', {}, 'GET');
    console.log('line');
    return res.result.airlines;
  } catch (e) {
    console.log('error', e);
  }
};

export const fetchAirportsDetail = async (data: AirServiceProps) => {
  try {
    const res = await request(`web/airports/${data.id}`, {}, 'GET');
    // console.log(data.id, res);
    return res.result.airport;
  } catch (e) {
    console.log('airportlist 오류', e);
  }
};

export const fetchAirlinesDetail = async (data: AirServiceProps) => {
  try {
    const res = await request(`web/airlines/${data.id}`, {}, 'GET');
    return {...res.result.airline, ...{image: data.logoImageUrl}};
  } catch (e) {
    console.log('airlinelist 오류', e);
  }
};

export const fetchAirlineReview = async (
  data: AirServiceProps,
  page: number,
) => {
  try {
    const res = await request(
      `web/airlines/${data.id}/reviews`,
      {page: page},
      'GET',
    );
    return res.result.airlineReview.map((review: any) => ({
      ...review,
      uid: nanoid(),
    }));
  } catch (e) {
    console.log('airline 리뷰 요청 실패', e);
  }
};

export const fetchAirportReview = async (
  data: AirServiceProps,
  page: number,
) => {
  console.log(data);
  try {
    const res = await request(
      `web/airports/${data.id}/reviews`,
      {page: page},
      'GET',
    );
    console.log('port', res.result.airportReviews);
    return res.result.airportReviews.map((review: any) => ({
      ...review,
      uid: nanoid(),
    }));
  } catch (e) {
    console.log('airport 리뷰 요청 실패', e);
  }
};

export const reportAirportReview = async (id: number | undefined) => {
  try {
    const res = await request(`web/airports/reviews/${id}/report`, {}, 'POST');
    return res;
  } catch (e) {
    console.log('airport 리뷰 신고 실패', e);
  }
};
export const reportAirlineReview = async (id: number | undefined) => {
  try {
    const res = await request(`web/airlines/reviews/${id}/report`, {}, 'POST');
    return res;
  } catch (e) {
    console.log('airline 리뷰 신고 실패', e);
  }
};
