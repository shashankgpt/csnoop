import * as fromRoot from '../../state/app.state';
import { SharedState, snack } from './shared.state';

const initialState: SharedState = {
  loggedIn: false,
  spinnerActive: false,
  snackBar: snack,
  username: ''
};

export interface State extends fromRoot.State {
  shared: SharedState;
}

export function reducer(state: SharedState = initialState, action): SharedState{
  // console.log('shared state' + JSON.stringify(state));
  // console.log('payload' + action.payload);
  switch (action.type) {
    case 'SPINNER_ACTIVATE':
      return {
        ...state,
        spinnerActive: action.payload
      };
    case 'LOGGED_IN':
      return {
        ...state,
        loggedIn: action.payload
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SET_NOTIFY':
      return {
        ...state,
        snackBar: action.payload
      };
    default:
      return state;
  }

}

