import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { UserState } from './user.state';

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
