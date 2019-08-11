import { Action } from '@ngrx/store';
import { IProfile } from '../dataTypes';
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
export class UpdateUser implements Action {
  readonly type = userActionTypes.UpdateUser;
  constructor(public payload: IProfile) { }
}
export class LoadUserSuccess implements Action {
  readonly type = userActionTypes.LoadUserSuccess;
  constructor(public payload: IProfile) {
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

export type UserActions = SetCurrentUsername |
  SetCurrentUserProfile |
  SetCurrentUserRole |
  LoadUser |
  LoadUserSuccess |
  LoadUserFail |
  UpdateUser |
  UpdateUserSuccess |
  UpdateUserFail;
