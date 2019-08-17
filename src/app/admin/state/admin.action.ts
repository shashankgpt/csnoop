import { Action } from '@ngrx/store';
import { IProfileAdmin } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';

export enum userActionTypes {
  LoadAllUser = '[Admin Api] Load All User',
  LoadAllUserSuccess = '[Admin Api] Load All User Success',
  LoadAllUserFail = '[Admin Api] Load All User Fail',
  LockUser = '[Admin Api] Lock User',
  LockUserSuccess = '[Admin Api] Lock User Success',
  LockUserFail = '[Admin Api] Lock User Fail',
  UnlockUser = '[Admin Api] Unlock User',
  UnlockUserSuccess = '[Admin Api] Unlock User Success',
  UnlockUserFail = '[Admin Api] Unlock User Fail',
  ActivateUser = '[Admin Api] Activate User',
  ActivateUserSuccess = '[Admin Api] Activate User Success',
  ActivateUserFail = '[Admin Api] Activate User Fail',
  DeactivateUser = '[Admin Api] deactivate User',
  DeactivateUserSuccess = '[Admin Api] deactivate User Success',
  DeactivateUserFail = '[Admin Api] deactivate User Fail',
}


export class LoadAllUser implements Action {
  readonly type = userActionTypes.LoadAllUser;
}

export class LoadAllUserSuccess implements Action {
  readonly type = userActionTypes.LoadAllUserSuccess;
  constructor(public payload: IProfileAdmin[]) {}
}

export class LoadAllUserFail implements Action {
  readonly type = userActionTypes.LoadAllUserFail;
  constructor(public payload: string) { }
}

export class LockUser implements Action {
  readonly type = userActionTypes.LockUser;
  constructor(public payload: string) { }
}

export class LockUserSuccess implements Action {
  readonly type = userActionTypes.LockUserSuccess;
  constructor(public payload: IResponse) {}
}

export class LockUserFail implements Action {
  readonly type = userActionTypes.LockUserFail;
  constructor(public payload: string) { }
}
export class UnlockUser implements Action {
  readonly type = userActionTypes.UnlockUser;
  constructor(public payload: string) { }
}

export class UnlockUserSuccess implements Action {
  readonly type = userActionTypes.UnlockUserSuccess;
  constructor(public payload: IResponse) {}
}

export class UnlockUserFail implements Action {
  readonly type = userActionTypes.UnlockUserFail;
  constructor(public payload: string) { }
}

export class ActivateUser implements Action {
  readonly type = userActionTypes.ActivateUser;
  constructor(public payload: string) { }
}

export class ActivateUserSuccess implements Action {
  readonly type = userActionTypes.ActivateUserSuccess;
  constructor(public payload: IResponse) {}
}

export class ActivateUserFail implements Action {
  readonly type = userActionTypes.ActivateUserFail;
  constructor(public payload: string) { }
}
export class DeactivateUser implements Action {
  readonly type = userActionTypes.DeactivateUser;
  constructor(public payload: string) { }
}

export class DeactivateUserSuccess implements Action {
  readonly type = userActionTypes.DeactivateUserSuccess;
  constructor(public payload: IResponse) {}
}

export class DeactivateUserFail implements Action {
  readonly type = userActionTypes.DeactivateUserFail;
  constructor(public payload: string) { }
}
export type UserActions = LoadAllUser |
LoadAllUserSuccess |
LoadAllUserFail |
LockUser |
LockUserSuccess |
LockUserFail |
UnlockUser |
UnlockUserSuccess |
UnlockUserFail |
ActivateUser |
ActivateUserSuccess |
ActivateUserFail |
DeactivateUser |
DeactivateUserSuccess |
DeactivateUserFail ;
