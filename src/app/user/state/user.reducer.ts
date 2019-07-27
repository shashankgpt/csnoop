export function reducer(state, action) {
  switch (action.type) {
    case 'TOKEN_CODE':
      console.log('existing state' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        tokenCodeValue: action.payload
      };

      default:
        return state;
  }

}
