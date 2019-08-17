import { IProfile} from '../../user/dataTypes';
import {ISnackbar} from '../../dataTypes/snackbar';

export interface AdminState {
  activeUsername: string;
  profiles: IProfile[];
  message: ISnackbar;
}

export const profileInitialState: IProfile[] = [{
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  location: '',
  website: ''
}];

const message: ISnackbar ={
  snackBarActive: false,
  snackBarAction: '',
  snackBarMessage: '',
  redirectUrl: ''
}
export const initialState: AdminState = {
  message,
  activeUsername: '',
  profiles: profileInitialState,
};
