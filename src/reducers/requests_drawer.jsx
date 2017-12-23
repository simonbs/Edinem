const initialState = {
  open: false
}
const requests_drawer_open = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_REQUESTS_DRAWER':
      state.open = action.open
      return 
    default:
      return state
  }
}

export default requests_drawer_open