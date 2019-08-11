import * as fromRoot from '../../state/app.state';
import { UserState, profileInitialState, roleInitialState } from './user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, userActionTypes } from './user.action';

const initialState: UserState = {
  username: '',
  profile: profileInitialState,
  role: roleInitialState,
  error: '',
  updateError: '',
  message: ''
};
export interface State extends fromRoot.State {
  user: UserState;
}
const getUserFeatureState = createFeatureSelector<UserState>('users');
export const getUserData = createSelector(getUserFeatureState,
  state => state.profile
);
export const getUserMessage = createSelector(getUserFeatureState,
  state => state.message
);
export const getUserName = createSelector(getUserFeatureState,
  state => state.username
);
export const getUserError = createSelector(getUserFeatureState,
  state => state.error
);
export const updateUserError = createSelector(getUserFeatureState,
  state => state.updateError
);
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

