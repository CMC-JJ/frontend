import create from 'zustand';

export type Auth = {
  phoneNumber: string;
  userName: string;
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
  userName: '',
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
