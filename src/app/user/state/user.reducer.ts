import { UserState, profileInitialState, roleInitialState, initialState } from './user.state';
import { UserActions, userActionTypes } from './user.action';
import { ISnackbar } from '../../dataTypes/snackbar';
import { act } from '@ngrx/effects';


export function reducer(state= initialState, action: UserActions): UserState  {
  // console.log('user state' + JSON.stringify(state));
  //  console.log('payload' + action);
  switch (action.type) {
    case userActionTypes.SetCurrentUsername:
      return {
        ...state,
        username: action.payload
      };
      case userActionTypes.SetCurrentUserProfile:
          return {
            ...state,
            profile: {...action.payload}
      };
      case userActionTypes.SetCurrentUserRole:
          return {
            ...state,
            role: action.payload,
      };
      case userActionTypes.LoadUserSuccess:
          return {
            ...state,
            profile: action.payload,
      };
      case userActionTypes.UpdateUserSuccess:
        const messageUpdateUserSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Edit User',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/user/view'
        };
        return {
            ...state,
            profile: action.payload.data.user,
            message: messageUpdateUserSuccess
      };
      case userActionTypes.UpdateUserPasswordSuccess:
          const messageUpdatePasswordSuccess: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'Edit User',
            snackBarMessage: action.payload.Message,
            redirectUrl: '/user/view'
          };
          return {
          ...state,
          message: messageUpdatePasswordSuccess
    };
    case userActionTypes.DeleteUserSuccess:
        const messageDeleteUserSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Edit User',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/auth/login'
        };
        return {
        ...state,
        username: null,
        profile: null,
        role: null,
        message: messageDeleteUserSuccess
  };
      case userActionTypes.LoadUserFail:
          const messageLoadUserFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'View User',
            snackBarMessage: action.payload,
            redirectUrl: '/auth/login'
          };
          return {
            ...state,
            profile: null,
            message: messageLoadUserFail
      };
      case userActionTypes.UpdateUserFail:
          const messageUpdateUserFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'Edit User',
            snackBarMessage: action.payload,
            redirectUrl: '/user/edit'
          };
          return {
            ...state,
            message: messageUpdateUserFail,
      };
      case userActionTypes.UpdateUserPasswordFail:
          const messageUpdatePasswordFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'Edit User',
            snackBarMessage: action.payload,
            redirectUrl: ''
          };
          return {
            ...state,
            message: messageUpdatePasswordFail,
      };
      case userActionTypes.DeleteUserFail:
          const messageUpdateDeleteFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'Edit User',
            snackBarMessage: action.payload,
            redirectUrl: '/user/edit'
          };
          return {
            ...state,
            message: messageUpdateDeleteFail,
      };
    default:
      return state;
  }

}

