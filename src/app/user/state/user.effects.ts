import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../state/user.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IProfile } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';
import { IProfileExtended, IPasswordChange } from '../dataTypes/profile';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) { }

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.LoadUser),
    mergeMap((action: UserActions.LoadUser) => this.userService.getLoggedInUser().pipe(
      map((res: IResponse) => new UserActions.LoadUserSuccess(res.data.user)),
      catchError(err => of(new UserActions.LoadUserFail('Unable to load User'))))));

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.UpdateUser),
    map((action: UserActions.UpdateUser) => action.payload),
    mergeMap((profile: IProfile) => this.userService.updateLoggedInUser(profile).pipe(
      map((res: IResponse) => new UserActions.UpdateUserSuccess(res)),
      catchError(err => of(new UserActions.UpdateUserFail('Unable to update User'))))));

  @Effect()
  updateUserPassword$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.UpdateUserPassword),
    map((action: UserActions.UpdateUserPassword) => action.payload),
    mergeMap((passwordObj: IPasswordChange) => this.userService.updatePassword(passwordObj).pipe(
      map((res: IResponse) => new UserActions.UpdateUserPasswordSuccess(res)),
      catchError(err => of(new UserActions.UpdateUserFail('Unable to update User Password'))))));
}
