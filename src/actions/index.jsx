export const openRequestsDrawer = () => {
  return {
    type: 'OPEN_REQUESTS_DRAWER'
  }
}

export const closeRequestsDrawer = () => {
  return {
    type: 'CLOSE_REQUESTS_DRAWER'
  }
}

export const changeRequestResponseTabIndex = (index) => {
  return {
    type: 'CHANGE_REQUEST_RESPONSE_TAB_INDEX',
    index: index
  }
}

export const changeRequestDetailsTabIndex = (index) => {
  return {
    type: 'CHANGE_REQUEST_DETAILS_TAB_INDEX',
    index: index
  }
}
