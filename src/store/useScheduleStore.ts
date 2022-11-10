import create from 'zustand';

export type Schedule = {
  name: string;
  startAt: string;
  departureAirportId: number;
  arrivalAirportId: number;
  airlineId: number;
  departureAirportServiceIds: number[];
  arrivalAirportServiceIds: number[];
  airlineServiceIds: number[];
};

type ScheduleStore = {
  schedule: Schedule;
  setSchedule: (key: keyof Schedule, value: Schedule[keyof Schedule]) => void;
  initializeSchedule: () => void;
};

const initialState: Schedule = {
  name: '',
  startAt: '',
  departureAirportId: 0,
  arrivalAirportId: 0,
  airlineId: 0,
  departureAirportServiceIds: [],
  arrivalAirportServiceIds: [],
  airlineServiceIds: [],
};

export const useScheduleStore = create<ScheduleStore>(set => ({
  schedule: initialState,
  setSchedule: (key, value) =>
    set(state => ({
      schedule: {
        ...state.schedule,
        [key]: value,
      },
    })),
  initializeSchedule: () => set(() => ({schedule: initialState})),
}));
