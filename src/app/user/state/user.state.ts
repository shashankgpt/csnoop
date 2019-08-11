import { IProfile} from '../dataTypes';
import {roleObject, role} from '../dataTypes/role-info';

export interface UserState {
  username: string;
  profile: IProfile;
  role: RoleState;
  latestErrorMessage: string;
  message: string;
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
