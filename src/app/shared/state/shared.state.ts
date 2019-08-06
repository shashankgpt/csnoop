import { ISnackbar } from '../../user/dataTypes';

export interface SharedState {
  loggedIn: boolean;
  spinnerActive: boolean;
  snackBar: ISnackbar;
  username: string;
}

export const snack: ISnackbar = {
  snackBarActive: false,
  snackBarMessage: '',
  snackBarAction: ''
}
