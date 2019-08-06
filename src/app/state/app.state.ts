import { ISnackbar } from '../user/dataTypes';

export interface State {
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
