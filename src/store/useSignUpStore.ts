import create from 'zustand';

export type SignUpForm = {
  phoneNumber: string;
  userName: string;
  password: string;
  nickName: string;
};

type SignUpStore = {
  signUpForm: SignUpForm;
  setSignUpForm: (key: keyof SignUpForm, value: string) => void;
  initializeSignUpForm: () => void;
};

const initialState: SignUpForm = {
  phoneNumber: '',
  userName: '',
  password: '',
  nickName: '',
};

export const useSignUpStore = create<SignUpStore>(set => ({
  signUpForm: initialState,
  setSignUpForm: (key, value) =>
    set(state => ({
      signUpForm: {
        ...state.signUpForm,
        [key]: value,
      },
    })),
  initializeSignUpForm: () => set(() => ({signUpForm: initialState})),
}));
