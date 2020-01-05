import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { UserService } from '../../user/services/user.service';
import * as SharedActions from '../state/shared.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';

@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions, private userService: UserService) { }

  @Effect()
  loadUserName$ = this.actions$.pipe(
    ofType(SharedActions.sharedActionTypes.LoadUserName),
    mergeMap((action: SharedActions.LoadUserName) => this.userService.getLoggedInUser().pipe(
      map((res: IResponse) => new SharedActions.LoadUserNameSuccess(res.data.user)),
      catchError(err => of(new SharedActions.LoadUserNameFail('Unable to load User'))))));
    }
