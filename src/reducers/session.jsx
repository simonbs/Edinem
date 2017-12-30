const initialState = {
  activeSession: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCEEDED_OPENING_SESSION':
      return {
        ...state,
        activeSession: action.session,
        error: null
      }
    case 'FAILED_OPENING_SESSION':
      return {
        ...state,
        activeSession: null,
        error: action.error
      }
    default:
      return state
  }
}