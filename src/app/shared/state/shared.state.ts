import { ISnackbar } from '../../dataTypes/snackbar';

export interface SharedState {
  loggedIn: boolean;
  spinnerActive: boolean;
  spinnerBtnActive: boolean;
  snackBar: ISnackbar;
  username: string;
}

export const snack: ISnackbar = {
  snackBarActive: false,
  snackBarMessage: '',
  snackBarAction: '',
  redirectUrl: ''
};

export const initialState: SharedState = {
  loggedIn: false,
  spinnerActive: false,
  spinnerBtnActive: false,
  snackBar: snack,
  username: ''
};
