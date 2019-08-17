import { IProfileAdmin , CompleteProfile} from '../dataTypes';
import {ISnackbar} from '../../dataTypes/snackbar';

export interface AdminState {
  activeUsername: string;
  profiles: IProfileAdmin[];
  message: ISnackbar;
}
export const profileInitialState: CompleteProfile = {
  firstName: '',
  lastName: '',
  location: '',
  website: '',
  gender: 1
};
export const InitialStateUsers: IProfileAdmin[] = [{
  lock: false,
  active: false,
  role: 4,
  username: '',
  email: '',
  createdAt: '',
  updatedAt: '',
  profile: profileInitialState,
  _id: '',
}];

const message: ISnackbar = {
  snackBarActive: false,
  snackBarAction: '',
  snackBarMessage: '',
  redirectUrl: ''
};
export const initialState: AdminState = {
  message,
  activeUsername: '',
  profiles: InitialStateUsers,
};
