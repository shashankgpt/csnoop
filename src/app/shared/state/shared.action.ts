import { Action } from '@ngrx/store';
import { ISnackbar } from 'src/app/user/dataTypes';

export enum sharedActionTypes {
  SetCurrentUsername = '[Shared] Set Current Username',
  ActivateSpinner = '[Shared] Activate Spinner',
  DeactivateSpinner = '[Shared] Deactivate Spinner',
  IsLoggedIn = '[Shared] Set Logged In',
  IsLoggedOut = '[Shared] Set Logged Out',
}

export class SetCurrentUsername implements Action {
  readonly type = sharedActionTypes.SetCurrentUsername;
  constructor(public payload: string) { }
}
export class ActivateSpinner implements Action {
  readonly type = sharedActionTypes.ActivateSpinner;
  constructor(public payload: ISnackbar) { }
}
export class DeactivateSpinner implements Action {
  readonly type = sharedActionTypes.DeactivateSpinner;
}
export class IsLoggedIn implements Action {
  readonly type = sharedActionTypes.IsLoggedIn;
}
export class IsLoggedOut implements Action {
  readonly type = sharedActionTypes.IsLoggedOut;
}

export type SharedActions = SetCurrentUsername
| ActivateSpinner
| DeactivateSpinner
| IsLoggedIn
| IsLoggedOut;
