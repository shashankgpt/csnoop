import * as fromRoot from '../../state/app.state';
import { AuthState, initialState } from './auth.state';

import { AuthActions, authActionTypes } from './auth.action';
import { ISnackbar } from 'src/app/user/dataTypes';

export interface State extends fromRoot.State {
  auth: AuthState;
}
export function reducer(state = initialState, action: AuthActions): AuthState {
  // console.log('existing state' + JSON.stringify(state));
  // console.log('payload' + action.payload);
  switch (action.type) {
    case authActionTypes.LoginUserSuccess:
      const messageLoginSuccess: ISnackbar = {
        snackBarActive: true,
        snackBarAction: 'Login',
        snackBarMessage: action.payload.Message,
        redirectUrl: '/user/view'
      };
      return {
        ...state,
        message: messageLoginSuccess,
        tokenCodeValue: action.payload.data.token,
      };
      case authActionTypes.LoginUserFail:
       const messageLoginFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'Login',
            snackBarMessage: action.payload,
            redirectUrl: '/auth/login'
          };
       return {
        ...state,
        message: messageLoginFail,
        tokenCodeValue: 0
      };
      case authActionTypes.RegisterUserSuccess:
       const messageRegisterSuccess: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'Register',
            snackBarMessage: action.payload.Message,
            redirectUrl: '/auth/login'
          };
       return {
        ...state,
        message: messageRegisterSuccess,
        justRegister: true
      };
      case authActionTypes.RegisterUserFail:
       const messageRegisterFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'Register',
            snackBarMessage: action.payload,
            redirectUrl: '/auth/register'
          };
       return {
        ...state,
        message : messageRegisterFail,
        justRegister: false
      };
      case authActionTypes.DeleteAllMessages:
       const resetMessage: ISnackbar = {
            snackBarActive: false,
            snackBarAction: '',
            snackBarMessage: '',
            redirectUrl: ''
          };
       return {
        ...state,
        message: resetMessage
      };
      case authActionTypes.LogoutUser:
       const resetMessageAll: ISnackbar = {
            snackBarActive: false,
            snackBarAction: '',
            snackBarMessage: '',
            redirectUrl: ''
          };
       return {
        ...state,
        message: resetMessageAll,
        tokenCodeValue: 0,
        justRegister: false,
      };
    default:
      return state;
  }

}


