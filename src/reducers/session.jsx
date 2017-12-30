import { 
  INITIATE_OPENING_SESSION,
  SUCCEEDED_OPENING_SESSION,
  FAILED_OPENING_SESSION,
  CLOSE_OPEN_SESSION_ERROR
} from '../actions'

const initialState = {
  isOpening: false,
  activeSession: null,
  openError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_OPENING_SESSION:
      return {
        ...state,
        isOpening: true
      }
    case SUCCEEDED_OPENING_SESSION:
      return {
        ...state,
        isOpening: false,
        activeSession: action.session,
        openError: null
      }
    case FAILED_OPENING_SESSION:
      return {
        ...state,
        isOpening: false,
        activeSession: null,
        openError: action.error
      }
    case CLOSE_OPEN_SESSION_ERROR:
      return {
        ...state,
        openError: null
      }
    default:
      return state
  }
}