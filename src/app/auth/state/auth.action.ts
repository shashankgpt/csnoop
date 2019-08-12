import { Action } from '@ngrx/store';
import { ILogin, IRegister } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';

export enum authActionTypes {
  RegisterUser = '[Register Api] Register New User',
  RegisterUserSuccess = '[Register Api] Register New User Success',
  RegisterUserFail = '[Register Api] Register New User Failure',
  LoginUser = '[Login Api] Login User',
  LoginUserSuccess = '[Login Api] Login User Success',
  LoginUserFail = '[Login Api] Login User Failure',
}

export class RegisterUser implements Action {
  readonly type = authActionTypes.RegisterUser;
  constructor(public payload: IRegister) { }
}

export class RegisterUserSuccess implements Action {
  readonly type = authActionTypes.RegisterUserSuccess;
  constructor(public payload: IResponse) {
  }
}
export class RegisterUserFail implements Action {
  readonly type = authActionTypes.RegisterUserFail;
  constructor(public payload: string) { }
}
export class LoginUser implements Action {
  readonly type = authActionTypes.LoginUser;
  constructor(public payload: ILogin) { }
}

export class LoginUserSuccess implements Action {
  readonly type = authActionTypes.LoginUserSuccess;
  constructor(public payload: IResponse) {
  }
}
export class LoginUserFail implements Action {
  readonly type = authActionTypes.LoginUserFail;
  constructor(public payload: string) { }
}

export type AuthActions = RegisterUser
| RegisterUserSuccess
| RegisterUserFail
| LoginUser
| LoginUserSuccess
| LoginUserFail;
