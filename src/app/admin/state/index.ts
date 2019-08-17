import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { AdminState } from './admin.state';

export interface State extends fromRoot.State {
  admin: AdminState;
}

const getAdminFeatureState = createFeatureSelector<AdminState>('admins');

export const getUsersData = createSelector(getAdminFeatureState,
  state => state.profiles
);
export const getAdminMessage = createSelector(getAdminFeatureState,
  state => state.message
);
export const getActiveUserName = createSelector(getAdminFeatureState,
  state => state.activeUsername
);
