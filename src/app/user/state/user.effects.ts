import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../state/user.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IProfile } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private userService: UserService) { }

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActions.userActionTypes.LoadUser),
    mergeMap((action: UserActions.LoadUser) => this.userService.getLoggedInUser().pipe(
      map((res: IResponse) => new UserActions.LoadUserSuccess(res.data.user)),
    catchError(err => of(new UserActions.LoadUserFail("new issue")))
    )
  )
  );
}
