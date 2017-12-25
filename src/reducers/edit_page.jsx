const initialState = {
  requestResponseTabIndex: 0,
  requestDetailsTabIndex: 0
}

const editPage = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_REQUEST_RESPONSE_TAB_INDEX':
      return {
        ...state,
        requestResponseTabIndex: action.index
      }
    case 'CHANGE_REQUEST_DETAILS_TAB_INDEX':
      return {
        ...state,
        requestDetailsTabIndex: action.index
      }
    default:
      return state
  }
}

export default editPage