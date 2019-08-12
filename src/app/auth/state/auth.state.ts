
export interface AuthState {
  tokenCodeValue: string | number;
  justRegister: boolean;
  latestErrorMessage: string;
  message: string;
}

export const initialState: AuthState = {
  tokenCodeValue: 0,
  justRegister: false,
  latestErrorMessage: '',
  message: ''
};
