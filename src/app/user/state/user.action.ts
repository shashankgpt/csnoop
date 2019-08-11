import { Action } from '@ngrx/store';
import { IProfile } from '../dataTypes';
import { RoleState } from './user.state';
import { IResponse } from 'src/app/shared/dataTypes';

export enum userActionTypes {
  SetCurrentUsername = '[User] Set Current Username',
  SetCurrentUserProfile = '[User] Set Current User Profile',
  SetCurrentUserRole = '[User] Set Current User Role',
  LoadUser = '[User] Load Current User',
  LoadUserSuccess = '[User] Load Current User Success',
  LoadUserFail = '[User] Load Current User Fail',
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
export class LoadUserSuccess implements Action {
  readonly type = userActionTypes.LoadUserSuccess;
  constructor(public payload: IProfile) {
    console.log("in action");
    console.log(this.payload);
  }
}
export class LoadUserFail implements Action {
  readonly type = userActionTypes.LoadUserFail;
  constructor(public payload: string) { }
}

export type UserActions = SetCurrentUsername |
  SetCurrentUserProfile |
  SetCurrentUserRole |
  LoadUser |
  LoadUserSuccess |
  LoadUserFail;
