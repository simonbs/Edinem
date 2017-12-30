const { dialog } = require('electron').remote
const XMLSessionMapper = require('../lib/xml_session_mapper')

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

export const succeededOpeningSession = (session) => {
  return {
    type: 'SUCCEEDED_OPENING_SESSION',
    session: session
  }
}

export const failedOpeningSession = (error) => {
  return {
    type: 'FAILED_OPENING_SESSION',
    error: error
  }
}

export const openSession = () => {
  return (dispatch) => {
    const properties = ['multiSelections', 'createDirectory', 'openFile']
    const parentWindow = (process.platform == 'darwin') ? null : BrowserWindow.getFocusedWindow()
    dialog.showOpenDialog(parentWindow, properties, (f) => {
      if (f !== undefined) {
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

export const closeOpenSessionError = () => {
  return {
    type: 'CLOSE_OPEN_SESSION_ERROR'
  }
}