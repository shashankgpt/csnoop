import * as fromRoot from '../../state/app.state';
import { UserState, profileInitialState,roleInitialState } from './user.state';

const initialState: UserState = {
  username: '',
  profile: profileInitialState,
  role: roleInitialState,
};
export interface State extends fromRoot.State {
  user: UserState;
}

export function reducer(state: UserState= initialState, action): UserState  {
  console.log('user state' + JSON.stringify(state));
  console.log('payload' + action.payload);
  switch (action.type) {
    case 'USER_NAME':
      return {
        ...state,
        username: action.payload
      };
      case 'USER_DATA':
          return {
            ...state,
            profile: action.payload
      };
      case 'ROLE_UPDATE':
          return {
            ...state,
            role: action.payload,
      };
    default:
      return state;
  }

}
