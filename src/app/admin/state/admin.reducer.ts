import { AdminState, InitialStateUsers, initialState } from './admin.state';
import { UserActions, userActionTypes } from './admin.action';
import { ISnackbar } from '../../dataTypes/snackbar';


export function reducer(state= initialState, action: UserActions): AdminState  {
  switch (action.type) {
    case userActionTypes.SetActiveUsername:
          return {
            ...state,
            activeUsername: action.payload,
      };
      case userActionTypes.LoadAllUserSuccess:
          return {
            ...state,
            profiles: action.payload,
      };
      case userActionTypes.LoadAllUserFail:
          const messageLoadUserFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'View All User',
            snackBarMessage: action.payload,
            redirectUrl: '/admin/view'
          };
          return {
            ...state,
            profiles: InitialStateUsers,
            message: messageLoadUserFail
      };
      case userActionTypes.LockUserSuccess:
        const messageLockUserSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageLockUserSuccess
      };
      case userActionTypes.LockUserFail:
        const messageLockUserFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageLockUserFail
      };
      case userActionTypes.UnlockUserSuccess:
        const messageUnlockUserSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageUnlockUserSuccess
      };
      case userActionTypes.UnlockUserFail:
        const messageUnlockUserFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageUnlockUserFail
      };
      case userActionTypes.ActivateUserSuccess:
        const messageActivateUserSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageActivateUserSuccess
      };
      case userActionTypes.ActivateUserFail:
        const messageActivateUserFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageActivateUserFail
      };
      case userActionTypes.DeactivateUserSuccess:
        const messageDeactivateUserSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageDeactivateUserSuccess
      };
      case userActionTypes.DeactivateUserFail:
        const messageDeactivateUserFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Edit User',
          snackBarMessage: action.payload,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageDeactivateUserFail
      };
      case userActionTypes.UpdateUserSuccess:
        const messageUpdateUserSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Update User',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageUpdateUserSuccess
      };
      case userActionTypes.UpdateUserFail:
        const messageUpdateUserFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Admin Update User',
          snackBarMessage: action.payload,
          redirectUrl: '/admin/allUsers'
        };
        return {
            ...state,
            message: messageUpdateUserFail
      };
    default:
      return state;
  }

}

