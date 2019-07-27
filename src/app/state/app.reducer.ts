export function reducer(state, action) {
  switch (action.type) {
    case 'SPINNER_ACTIVATE':
      console.log('existing state' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        showSpinner: 'test'
      };

      default:
        return state;
  }

}
