import create from 'zustand/vanilla';
import createHook from 'zustand';

export type Auth = {
  phoneNumber: string;
  userId: number;
  nickName: string;
  jwtToken: string;
};

type SignUpStore = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  getState: () => SignUpStore;
  initializeAuth: () => void;
};

const initialState: Auth = {
  phoneNumber: '',
  userId: 0,
  nickName: '',
  jwtToken: '',
};

export const authStore = create<SignUpStore>((set, get) => ({
  auth: initialState,
  setAuth: authInfo =>
    set(() => ({
      auth: authInfo,
    })),
  getState: () => get(),
  initializeAuth: () => set(() => ({auth: initialState})),
}));

export const useAuthStore = createHook(authStore);
