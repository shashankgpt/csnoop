import { Action } from '@ngrx/store';
import { IProfileAdmin } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';

export enum userActionTypes {
  LoadAllUser = '[Admin Api] Load All User',
  LoadAllUserSuccess = '[Admin Api] Load All User Success',
  LoadAllUserFail = '[Admin Api] Load All User Fail',
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


export type UserActions = LoadAllUser |
LoadAllUserSuccess |
LoadAllUserFail ;
