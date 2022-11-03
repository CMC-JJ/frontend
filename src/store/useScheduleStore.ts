import create from 'zustand';

// userId 필요
export type Schedule = {
  name: string;
  startAt: Date;
  endAt: Date;
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
  startAt: new Date(),
  endAt: new Date(),
  departureAirportId: 0,
  arrivalAirportId: 0,
  airlineId: 0,
  departureAirportServiceIds: [],
  arrivalAirportServiceIds: [],
  airlineServiceIds: [],
};

export const useAuthStore = create<ScheduleStore>(set => ({
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
