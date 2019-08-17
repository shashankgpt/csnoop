import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { AdminService } from '../services/admin.service';
import * as UserActions from './admin.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private adminService: AdminService) { }

  @Effect()
  loadAllUsers$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.LoadAllUser),
    mergeMap((action: UserActions.LoadAllUser) => this.adminService.getAllUsers().pipe(
      map((res: IResponse) => new UserActions.LoadAllUserSuccess(res.data.users)),
      catchError(err => of(new UserActions.LoadAllUserFail('Unable to load All User'))))));

}
