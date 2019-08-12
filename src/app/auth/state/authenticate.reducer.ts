import * as fromRoot from '../../state/app.state';
import { AuthState, initialState } from './auth.state';

import { AuthActions, authActionTypes } from './auth.action';

export interface State extends fromRoot.State {
  auth: AuthState;
}
export function reducer(state = initialState, action: AuthActions): AuthState {
  // console.log('existing state' + JSON.stringify(state));
  // console.log('payload' + action.payload);
  switch (action.type) {
    case authActionTypes.LoginUserSuccess:
      return {
        ...state,
        tokenCodeValue: action.payload.data.token,
        message: action.payload.Message
      };
      case authActionTypes.LoginUserFail:
      return {
        ...state,
        tokenCodeValue: 0,
        latestErrorMessage: action.payload
      };
      case authActionTypes.RegisterUserSuccess:
      return {
        ...state,
        justRegister: true,
        message: action.payload.Message
      };
      case authActionTypes.RegisterUserFail:
      return {
        ...state,
        justRegister: false,
        latestErrorMessage: action.payload
      };
    default:
      return state;
  }

}


