import { Action } from '@ngrx/store';
import { IProfile, IPasswordChange } from '../dataTypes';
import { RoleState } from './user.state';
import { IResponse } from 'src/app/shared/dataTypes';

export enum userActionTypes {
  SetCurrentUsername = '[User] Set Current Username',
  SetCurrentUserProfile = '[User] Set Current User Profile',
  SetCurrentUserRole = '[User] Set Current User Role',
  LoadUser = '[User Api] Load Current User',
  LoadUserSuccess = '[User Api] Load Current User Success',
  LoadUserFail = '[User Api] Load Current User Fail',
  UpdateUser = '[User Api] Update Current User',
  UpdateUserSuccess = '[User Api] Update Current User Success',
  UpdateUserFail = '[User Api] Update Current User Fail',
  UpdateUserPassword = '[User Api] Update Current User Password',
  UpdateUserPasswordSuccess = '[User Api] Update Current User Password Success',
  UpdateUserPasswordFail = '[User Api] Update Current User Password Fail',
  DeleteUser = '[User Api] Delete Current User',
  DeleteUserSuccess = '[User Api] Delete Current User Success',
  DeleteUserFail = '[User Api] Delete Current User Fail',
}

export class SetCurrentUsername implements Action {
  readonly type = userActionTypes.SetCurrentUsername;
  constructor(public payload: string) { }
}
export class SetCurrentUserProfile implements Action {
  readonly type = userActionTypes.SetCurrentUserProfile;
  constructor(public payload: IProfile) { }
}
export class SetCurrentUserRole implements Action {
  readonly type = userActionTypes.SetCurrentUserRole;
  constructor(public payload: RoleState) { }
}
export class LoadUser implements Action {
  readonly type = userActionTypes.LoadUser;
}
export class DeleteUser implements Action {
  readonly type = userActionTypes.DeleteUser;
}
export class UpdateUser implements Action {
  readonly type = userActionTypes.UpdateUser;
  constructor(public payload: IProfile) { }
}
export class UpdateUserPassword implements Action {
  readonly type = userActionTypes.UpdateUserPassword;
  constructor(public payload: IPasswordChange) { }
}
export class LoadUserSuccess implements Action {
  readonly type = userActionTypes.LoadUserSuccess;
  constructor(public payload: IProfile) {
  }
}
export class DeleteUserSuccess implements Action {
  readonly type = userActionTypes.DeleteUserSuccess;
  constructor(public payload: IResponse) {
  }
}
export class UpdateUserPasswordSuccess implements Action {
  readonly type = userActionTypes.UpdateUserPasswordSuccess;
  constructor(public payload: IResponse) {
  }
}
export class UpdateUserSuccess implements Action {
  readonly type = userActionTypes.UpdateUserSuccess;
  constructor(public payload: IResponse) {
  }
}
export class LoadUserFail implements Action {
  readonly type = userActionTypes.LoadUserFail;
  constructor(public payload: string) { }
}
export class UpdateUserFail implements Action {
  readonly type = userActionTypes.UpdateUserFail;
  constructor(public payload: string) { }
}
export class UpdateUserPasswordFail implements Action {
  readonly type = userActionTypes.UpdateUserPasswordFail;
  constructor(public payload: string) { }
}
export class DeleteUserFail implements Action {
  readonly type = userActionTypes.DeleteUserFail;
  constructor(public payload: string) { }
}

export type UserActions = SetCurrentUsername |
  SetCurrentUserProfile |
  SetCurrentUserRole |
  LoadUser |
  LoadUserSuccess |
  LoadUserFail |
  UpdateUser |
  UpdateUserSuccess |
  UpdateUserFail |
  UpdateUserPassword |
  UpdateUserPasswordSuccess |
  UpdateUserPasswordFail |
  DeleteUser |
  DeleteUserSuccess |
  DeleteUserFail;
