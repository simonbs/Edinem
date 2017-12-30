import { 
  OPEN_REQUESTS_DRAWER,
  CLOSE_REQUESTS_DRAWER
} from '../actions'

const initialState = {
  open: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_REQUESTS_DRAWER:
      return {
        ...state,
        open: true
      }
    case CLOSE_REQUESTS_DRAWER:
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}