const initialState = {
  open: false
}

const requestsDrawer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_REQUESTS_DRAWER':
      return {
        ...state,
        open: true
      }
    case 'CLOSE_REQUESTS_DRAWER':
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}

export default requestsDrawer