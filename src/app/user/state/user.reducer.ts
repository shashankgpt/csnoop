import { UserState, profileInitialState, roleInitialState } from './user.state';
import { UserActions, userActionTypes } from './user.action';

const initialState: UserState = {
  username: '',
  profile: profileInitialState,
  role: roleInitialState,
  error: '',
  updateError: '',
  message: ''
};


export function reducer(state= initialState, action: UserActions): UserState  {
  console.log('user state' + JSON.stringify(state));
   console.log('payload' + action);
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
          return {
            ...state,
            profile: action.payload.data.user,
            message: action.payload.Message
      };
      case userActionTypes.LoadUserFail:
          return {
            ...state,
            profile: null,
            error: action.payload,
      };
      case userActionTypes.UpdateUserFail:
          return {
            ...state,
            updateError: action.payload,
      };
    default:
      return state;
  }

}

