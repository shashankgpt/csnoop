import { AdminState, InitialStateUsers, initialState } from './admin.state';
import { UserActions, userActionTypes } from './admin.action';
import { ISnackbar } from '../../dataTypes/snackbar';


export function reducer(state= initialState, action: UserActions): AdminState  {
  switch (action.type) {
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
    default:
      return state;
  }

}

