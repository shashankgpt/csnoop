import * as fromRoot from '../../state/app.state';
import { SharedState, initialState } from './shared.state';
import { sharedActionTypes, SharedActions } from './shared.action';




export function reducer(state: SharedState = initialState, action: SharedActions): SharedState {
  // console.log('shared state' + JSON.stringify(state));
  // console.log('payload' + action.payload);
  switch (action.type) {
    case sharedActionTypes.ActivateSpinner:
      return {
        ...state,
        spinnerActive: true
      };
      case sharedActionTypes.DeactivateSpinner:
      return {
        ...state,
        spinnerActive: false
      };
      case sharedActionTypes.ActivateSnackBar:
      return {
        ...state,
        snackBar: action.payload
      };
      case sharedActionTypes.DeactivateSnackBar:
      return {
        ...state,
        snackBar: initialState.snackBar
      };
      case sharedActionTypes.IsLoggedIn:
      return {
        ...state,
        loggedIn: true,
        username: action.payload
      };
      case sharedActionTypes.IsLoggedOut:
      return {
        ...state,
        username: null,
        loggedIn: false
      };
      case sharedActionTypes.SetCurrentUsername:
      return {
        ...state,
        username: action.payload,
      };

    // case 'LOGGED_IN':
    //   return {
    //     ...state,
    //     loggedIn: action.payload
    //   };
    // case 'SET_USERNAME':
    //   return {
    //     ...state,
    //     username: action.payload
    //   };
    // case 'SET_NOTIFY':
    //   return {
    //     ...state,
    //     snackBar: action.payload
    //   };
    default:
      return state;
  }

}

