import create from 'zustand';

export type Auth = {
  phoneNumber: string;
  userId: number;
  nickName: string;
  userName: string;
  jwtToken: string;
};

type SignUpStore = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  setOnlyNickName: (nickName: string) => void;
  getState: () => SignUpStore;
  initializeAuth: () => void;
};

export const initialState: Auth = {
  phoneNumber: '',
  userId: 0,
  nickName: '',
  userName: '',
  jwtToken: '',
};

export const useAuthStore = create<SignUpStore>((set, get) => ({
  auth: initialState,
  setAuth: authInfo =>
    set(() => ({
      auth: authInfo,
    })),
  setOnlyNickName: (nickName: string) => {
    set(prev => ({auth: {...prev.auth, nickName}}));
  },
  getState: () => get(),
  initializeAuth: () => set(() => ({auth: initialState})),
}));
