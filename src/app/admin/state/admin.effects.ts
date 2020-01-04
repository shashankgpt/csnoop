import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { AdminService } from '../services/admin.service';
import * as UserActions from './admin.action';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';
import { IProfileExtended } from 'src/app/user/dataTypes/profile';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private adminService: AdminService) { }

  @Effect()
  loadAllUsers$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.LoadAllUser),
    exhaustMap((action: UserActions.LoadAllUser) => this.adminService.getAllUsers().pipe(
      map((res: IResponse) => new UserActions.LoadAllUserSuccess(res.data.users)),
      catchError(err => of(new UserActions.LoadAllUserFail('Unable to load All User'))))));

  @Effect()
  lockUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.LockUser),
    map((action: UserActions.LockUser) => action.payload),
    mergeMap((username: string) => this.adminService.lockUser(username).pipe(
      map((res: IResponse) => new UserActions.LockUserSuccess(res)),
      catchError(err => of(new UserActions.LockUserFail('Unable to lock User -' + username))))));

  @Effect()
  unlockUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.UnlockUser),
    map((action: UserActions.UnlockUser) => action.payload),
    mergeMap((username: string) => this.adminService.unlockUser(username).pipe(
      map((res: IResponse) => new UserActions.UnlockUserSuccess(res)),
      catchError(err => of(new UserActions.UnlockUserFail('Unable to unlock User -' + username))))));

  @Effect()
  activateUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.ActivateUser),
    map((action: UserActions.ActivateUser) => action.payload),
    mergeMap((username: string) => this.adminService.activateUser(username).pipe(
      map((res: IResponse) => new UserActions.ActivateUserSuccess(res)),
      catchError(err => of(new UserActions.ActivateUserFail('Unable to activate User -' + username))))));

  @Effect()
  deactivateUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.DeactivateUser),
    map((action: UserActions.DeactivateUser) => action.payload),
    mergeMap((username: string) => this.adminService.deactivateUser(username).pipe(
      map((res: IResponse) => new UserActions.DeactivateUserSuccess(res)),
      catchError(err => of(new UserActions.DeactivateUserFail('Unable to deactivate User -' + username))))));

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.UpdateUser),
    map((action: UserActions.UpdateUser) => action.payload),
    mergeMap((profile: IProfileExtended) => this.adminService.updateUser(profile).pipe(
      map((res: IResponse) => new UserActions.UpdateUserSuccess(res)),
      catchError(err => of(new UserActions.UpdateUserFail('Unable to deactivate User -' + profile.username))))));

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.DeleteUser),
    map((action: UserActions.DeleteUser) => action.payload),
    mergeMap((username: string) => this.adminService.deleteUser(username).pipe(
      map((res: IResponse) => new UserActions.DeleteUserSuccess(res)),
      catchError(err => of(new UserActions.DeleteUserFail('Unable to Delete User -' + username))))));

  @Effect()
  logoutUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.LogoutUser),
    map((action: UserActions.LogoutUser) => action.payload),
    mergeMap((username: string) => this.adminService.logoutUser(username).pipe(
      map((res: IResponse) => new UserActions.LogoutUserSuccess(res)),
      catchError(err => of(new UserActions.LogoutUserFail('Unable to logout User -' + username))))));
}
