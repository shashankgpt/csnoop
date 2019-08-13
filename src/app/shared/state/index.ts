import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { SharedState } from './shared.state';

export interface State extends fromRoot.State {
  shared: SharedState;
}

const getSharedFeatureState = createFeatureSelector<SharedState>('shared');

export const getLoggedUserName = createSelector(getSharedFeatureState,
  state => state.username
);
export const getSnackbarMessage = createSelector(getSharedFeatureState,
  state => state.snackBar
);
export const LoggedIn = createSelector(getSharedFeatureState,
  state => state.loggedIn
);
export const Spinner = createSelector(getSharedFeatureState,
  state => state.spinnerActive
);
