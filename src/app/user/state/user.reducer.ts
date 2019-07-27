export function reducer(state, action) {
  switch (action.type) {
    case 'USER_DATA':
      console.log('existing state' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        user: action.payload
      };
      case 'USER_NAME':
      console.log('existing state' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        username: action.payload
      };

      default:
        return state;
  }

}
