import create from 'zustand';

export type Auth = {
  phoneNumber: string;
  userId: number;
  nickName: string;
  jwtToken: string;
};

type SignUpStore = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  initializeAuth: () => void;
};

const initialState: Auth = {
  phoneNumber: '',
  userId: 0,
  nickName: '',
  jwtToken: '',
};

export const useAuthStore = create<SignUpStore>(set => ({
  auth: initialState,
  setAuth: authInfo =>
    set(() => ({
      auth: authInfo,
    })),
  initializeAuth: () => set(() => ({auth: initialState})),
}));
