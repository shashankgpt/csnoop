import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../state/auth.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ILogin, IRegister } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  registerUser$ = this.actions$.pipe(
    ofType(AuthActions.authActionTypes.RegisterUser),
    map((action: AuthActions.RegisterUser) => action.payload),
    mergeMap((register: IRegister) => this.authService.register(register.username, register.password, register.email).pipe(
      map((res: IResponse) => new AuthActions.RegisterUserSuccess(res)),
      catchError(err => of(new AuthActions.RegisterUserFail('Unable to Register User'))))));

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType(AuthActions.authActionTypes.LoginUser),
    map((action: AuthActions.LoginUser) => action.payload),
    mergeMap((login: ILogin) => this.authService.login(login.username,login.password).pipe(
      map((res: IResponse) => new AuthActions.LoginUserSuccess(res)),
      catchError(err => of(new AuthActions.LoginUserFail('Unable to Login'))))));

}

