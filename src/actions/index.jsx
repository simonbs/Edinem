const { dialog } = require('electron').remote
const XMLSessionMapper = require('../lib/xml_session_mapper')

export const OPEN_REQUESTS_DRAWER = 'OPEN_REQUESTS_DRAWER'
export const openRequestsDrawer = () => {
  return {
    type: OPEN_REQUESTS_DRAWER
  }
}

export const CLOSE_REQUESTS_DRAWER = 'CLOSE_REQUESTS_DRAWER'
export const closeRequestsDrawer = () => {
  return {
    type: CLOSE_REQUESTS_DRAWER
  }
}

export const CHANGE_REQUEST_RESPONSE_TAB_INDEX = 'CHANGE_REQUEST_RESPONSE_TAB_INDEX'
export const changeRequestResponseTabIndex = (index) => {
  return {
    type: CHANGE_REQUEST_RESPONSE_TAB_INDEX,
    index: index
  }
}

export const CHANGE_REQUEST_DETAILS_TAB_INDEX = 'CHANGE_REQUEST_DETAILS_TAB_INDEX'
export const changeRequestDetailsTabIndex = (index) => {
  return {
    type: CHANGE_REQUEST_DETAILS_TAB_INDEX,
    index: index
  }
}

export const INITIATE_OPENING_SESSION = 'INITIATE_OPENING_SESSION'
export const initiateOpeningSession = () => {
  return {
    type: INITIATE_OPENING_SESSION,
  }
}

export const SUCCEEDED_OPENING_SESSION = 'SUCCEEDED_OPENING_SESSION'
export const succeededOpeningSession = (session) => {
  return {
    type: SUCCEEDED_OPENING_SESSION,
    session: session
  }
}

export const FAILED_OPENING_SESSION = 'FAILED_OPENING_SESSION'
export const failedOpeningSession = (error) => {
  return {
    type: FAILED_OPENING_SESSION,
    error: error
  }
}

export const openSession = () => {
  return (dispatch) => {
    const properties = ['multiSelections', 'createDirectory', 'openFile']
    const parentWindow = (process.platform == 'darwin') ? null : BrowserWindow.getFocusedWindow()
    dialog.showOpenDialog(parentWindow, properties, (f) => {
      if (f !== undefined) {
        dispatch(initiateOpeningSession())
        const filePath = f[0]
        const xmlSessionMapper = new XMLSessionMapper()
        xmlSessionMapper.map(filePath, (err, session) => {
          if (err) {
            dispatch(failedOpeningSession(err))
          } else {
            dispatch(succeededOpeningSession(session))            
          }
        })
      } 
    })
  }
}

export const CLOSE_OPEN_SESSION_ERROR = 'CLOSE_OPEN_SESSION_ERROR'
export const closeOpenSessionError = () => {
  return {
    type: CLOSE_OPEN_SESSION_ERROR
  }
}