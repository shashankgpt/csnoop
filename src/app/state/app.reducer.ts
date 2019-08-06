import { State, snack } from './app.state';

const initialState: State = {
  loggedIn: false,
  spinnerActive: false,
  snackBar: snack,
  username: '',
};

export function reducer(state: State = initialState, action) {
  console.log('existing state' + JSON.stringify(state));
  console.log('payload' + action.payload);
  switch (action.type) {
    case 'SPINNER_ACTIVATE':
      return {
        ...state,
        spinnerActive: action.payload
      };
    case 'LOGGED_IN':
      return {
        ...state,
        spinnerActive: action.payload
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
