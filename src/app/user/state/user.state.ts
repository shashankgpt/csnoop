import { IProfile} from '../dataTypes';
import {ISnackbar} from '../../dataTypes/snackbar'
import {roleObject, role} from '../dataTypes/role-info';

export interface UserState {
  username: string;
  profile: IProfile;
  role: RoleState;
  message: ISnackbar;
}

export interface RoleState {
  roleCode: number;
  roleName: string;
}

export const profileInitialState: IProfile = {
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  location: '',
  website: ''
};
export const roleInitialState: RoleState = {
  roleCode: role.user,
  roleName: roleObject[role.user]
};
const message: ISnackbar ={
  snackBarActive: false,
  snackBarAction: '',
  snackBarMessage: '',
  redirectUrl: ''
}
export const initialState: UserState = {
  message,
  username: '',
  profile: profileInitialState,
  role: roleInitialState,
};
