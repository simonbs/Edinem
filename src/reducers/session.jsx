const initialState = {
  activeSession: null,
  openError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCEEDED_OPENING_SESSION':
      return {
        ...state,
        activeSession: action.session,
        openError: null
      }
    case 'FAILED_OPENING_SESSION':
      return {
        ...state,
        activeSession: null,
        openError: action.error
      }
    case 'CLOSE_OPEN_SESSION_ERROR':
      return {
        ...state,
        openError: null
      }
    default:
      return state
  }
}