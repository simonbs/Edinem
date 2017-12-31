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

export const FINALIZE_OPENING_SESSION = 'FINALIZE_OPENING_SESSION'
export const finalizeOpeningSession = () => {
  return {
    type: FINALIZE_OPENING_SESSION
  }
}

export const openSession = () => {
  return (dispatch) => {
    const properties = ['multiSelections', 'createDirectory', 'openFile']
    const parentWindow = (process.platform == 'darwin') ? null : BrowserWindow.getFocusedWindow()
    dialog.showOpenDialog(parentWindow, properties, (f) => {
      if (f !== undefined) {
        const filePath = f[0]
        dispatch(parseSession(filePath))
      }
    })
  }
}

export const parseSession = (filePath) => {
  return (dispatch) => {
    dispatch(initiateOpeningSession())
    const xmlSessionMapper = new XMLSessionMapper()
    xmlSessionMapper.map(filePath, (err, session) => {
      if (err) {
        dispatch(failedOpeningSession(err))
      } else {
        dispatch(succeededOpeningSession(session))
        if (session.transactionGroups.length > 0) {
          const transactionGroup = session.transactionGroups[0]
          dispatch(selectTransaction(transactionGroup.id, 0))
          dispatch(toggleTransactionGroupExpanded(transactionGroup.id))
        }
        dispatch(finalizeOpeningSession())
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

export const SELECT_TRANSACTION = 'SELECT_TRANSACTION'
export const selectTransaction = (transactionGroupId, transactionIndex) => {
  return {
    type: SELECT_TRANSACTION,
    transactionGroupId: transactionGroupId,
    transactionIndex: transactionIndex
  }
}

export const TOGGLE_TRANSACTION_GROUP_EXPANDED = 'TOGGLE_TRANSACTION_GROUP_EXPANDED'
export const toggleTransactionGroupExpanded = (transactionGroupId) => {
  return {
    type: TOGGLE_TRANSACTION_GROUP_EXPANDED,
    transactionGroupId: transactionGroupId
  }
}
