import { IProfile } from '../dataTypes';

export interface UserState {
  username: string;
  profile: IProfile;
  role: RoleState;
  error: string;
  updateError: string;
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

export const roleInitialState: RoleState ={
roleCode: 0,
roleName: 'user'
};
