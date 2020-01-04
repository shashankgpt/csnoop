import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { AuthState } from './auth.state';

export interface State extends fromRoot.State {
  auth: AuthState;
}

const getAuthFeatureState = createFeatureSelector<AuthState>('authentications');

export const getToken = createSelector(getAuthFeatureState,
  state => state.tokenCodeValue
);
export const getAuthMessage = createSelector(getAuthFeatureState,
  state => state.message
);
export const justRegister = createSelector(getAuthFeatureState,
  state => state.justRegister
);

