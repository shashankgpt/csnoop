import { Action } from '@ngrx/store';
import { ISnackbar } from 'src/app/dataTypes/snackbar';
import { IProfileLog  } from '../dataTypes/IProfile';

export enum sharedActionTypes {
  SetCurrentUsername = '[Shared] Set Current Username',
  ActivateSpinner = '[Shared] Activate Spinner',
  DeactivateSpinner = '[Shared] Deactivate Spinner',
  ActivateSnackBar = '[Shared] Activate Snack bar',
  DeactivateSnackBar = '[Shared] Deactivate Snack bar',
  LoadUserName = '[Shared] Load Current User',
  LoadUserNameSuccess = '[Shared] Load Current User Success',
  LoadUserNameFail = '[Shared] Load Current User Fail',
  IsLoggedIn = '[Shared] Set Logged In',
  IsLoggedOut = '[Shared] Set Logged Out',
}

export class LoadUserName implements Action {
  readonly type = sharedActionTypes.LoadUserName;
}
export class LoadUserNameSuccess implements Action {
  readonly type = sharedActionTypes.LoadUserNameSuccess;
  constructor(public payload: IProfileLog) {
  }
}
export class LoadUserNameFail implements Action {
  readonly type = sharedActionTypes.LoadUserNameFail;
  constructor(public payload: string) { }
}
export class SetCurrentUsername implements Action {
  readonly type = sharedActionTypes.SetCurrentUsername;
  constructor(public payload: string) { }
}
export class ActivateSnackBar implements Action {
  readonly type = sharedActionTypes.ActivateSnackBar;
  constructor(public payload: ISnackbar) { }
}
export class DeactivateSnackBar implements Action {
  readonly type = sharedActionTypes.DeactivateSnackBar;
}
export class ActivateSpinner implements Action {
  readonly type = sharedActionTypes.ActivateSpinner;
}
export class DeactivateSpinner implements Action {
  readonly type = sharedActionTypes.DeactivateSpinner;
}
export class IsLoggedIn implements Action {
  readonly type = sharedActionTypes.IsLoggedIn;
  constructor(public payload: string) { }
}
export class IsLoggedOut implements Action {
  readonly type = sharedActionTypes.IsLoggedOut;
}

export type SharedActions = SetCurrentUsername
| ActivateSpinner
| DeactivateSpinner
| IsLoggedIn
| IsLoggedOut
| ActivateSnackBar
| DeactivateSnackBar
| LoadUserName
| LoadUserNameSuccess
| LoadUserNameFail;
