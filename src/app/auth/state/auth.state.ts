import { ISnackbar } from 'src/app/dataTypes/snackbar';

export interface AuthState {
  tokenCodeValue: string | number;
  justRegister: boolean;
  message: ISnackbar;
}
const message: ISnackbar = {
  snackBarActive: false,
  snackBarAction: '',
  snackBarMessage: '',
  redirectUrl: '',
};
export const initialState: AuthState = {
  tokenCodeValue: 0,
  justRegister: false,
  message
};
