import { Action } from '@ngrx/store';
import { IProfileAdmin } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';
import { IProfile } from 'src/app/user/dataTypes';
import { IProfileExtended } from 'src/app/user/dataTypes/profile';

export enum userActionTypes {
  SetActiveUsername = '[Admin] Set Active Username',
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
  UpdateUser = '[Admin Api] Update User',
  UpdateUserSuccess = '[Admin Api] Update User Success',
  UpdateUserFail = '[Admin Api] Update User Fail',
  DeleteUser = '[Admin Api] Delete User',
  DeleteUserSuccess = '[Admin Api] Delete User Success',
  DeleteUserFail = '[Admin Api] Delete User Fail',
}

export class SetActiveUsername implements Action {
  readonly type = userActionTypes.SetActiveUsername;
  constructor(public payload: string) { }
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
export class UpdateUser implements Action {
  readonly type = userActionTypes.UpdateUser;
  constructor(public payload: IProfileExtended) { }
}

export class UpdateUserSuccess implements Action {
  readonly type = userActionTypes.UpdateUserSuccess;
  constructor(public payload: IResponse) {}
}

export class UpdateUserFail implements Action {
  readonly type = userActionTypes.UpdateUserFail;
  constructor(public payload: string) { }
}

export class DeleteUser implements Action {
  readonly type = userActionTypes.DeleteUser;
  constructor(public payload: string) { }
}

export class DeleteUserSuccess implements Action {
  readonly type = userActionTypes.DeleteUserSuccess;
  constructor(public payload: IResponse) {}
}

export class DeleteUserFail implements Action {
  readonly type = userActionTypes.DeleteUserFail;
  constructor(public payload: string) { }
}

export type UserActions = SetActiveUsername |
LoadAllUser |
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
DeactivateUserFail |
UpdateUser |
UpdateUserSuccess |
UpdateUserFail |
DeleteUser |
DeleteUserSuccess |
DeleteUserFail;
