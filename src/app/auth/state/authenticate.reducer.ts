import * as fromRoot from '../../state/app.state';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  tokenCodeValue: 0,
  justRegister: false,
}
export interface State extends fromRoot.State {
  auth: AuthState;
}
export function reducer(state = initialState, action): AuthState {
  console.log('existing state' + JSON.stringify(state));
  console.log('payload' + action.payload);
  switch (action.type) {
    case 'TOKEN_CODE':
      return {
        ...state,
        tokenCodeValue: action.payload
      };
    case 'JUST_REGISTER':
      return {
        ...state,
        justRegister: action.payload
      };
    default:
      return state;
  }

}

