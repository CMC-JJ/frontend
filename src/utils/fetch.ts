import {request} from './api';

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

export const fetchAirportsDetail = async (v: any) => {
  try {
    const res = await request(`web/airports/${v.id}`, {}, 'GET');
    // console.log(v.id, res);
    return res.result.airport;
  } catch (e) {
    console.log('airportlist 오류', e);
  }
};

export const fetchAirlinesDetail = async (v: any) => {
  try {
    const res = await request(`web/airlines/${v.id}`, {}, 'GET');
    return {...res.result.airline, ...{image: v.logoImageUrl}};
  } catch (e) {
    console.log('airlinelist 오류', e);
  }
};
