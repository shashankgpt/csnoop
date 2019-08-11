import * as fromRoot from '../../state/app.state';
import { UserState, profileInitialState, roleInitialState } from './user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, userActionTypes } from './user.action';

const initialState: UserState = {
  username: '',
  profile: profileInitialState,
  role: roleInitialState,
  error: ''
};
export interface State extends fromRoot.State {
  user: UserState;
}
const getUserFeatureState = createFeatureSelector<UserState>('users');
export const getUserData = createSelector(getUserFeatureState,
  state => state.profile
);
export const getUserName = createSelector(getUserFeatureState,
  state => state.username
);
export const getUserError = createSelector(getUserFeatureState,
  state => state.error
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
      case userActionTypes.LoadUserFail:
          return {
            ...state,
            profile: null,
            error: action.payload,
      };
    default:
      return state;
  }

}

