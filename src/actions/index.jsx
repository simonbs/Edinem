const { remote } = require('electron')
const { dialog } = remote
const CharlesSessionDecoder = require('../lib/charles_session_decoder')
const SaveQueue = require('../lib/save_queue')
const ApplicationMenuManager = require('../lib/application_menu_manager')

const saveQueue = new SaveQueue()

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

export const CHANGE_REQUEST_EDITOR_CONTENT_TYPE_TAB_INDEX = 'CHANGE_REQUEST_EDITOR_CONTENT_TYPE_TAB_INDEX'
export const changeRequestEditorContentTypeTabIndex = (index) => {
  return {
    type: CHANGE_REQUEST_EDITOR_CONTENT_TYPE_TAB_INDEX,
    index: index
  }
}

export const CHANGE_RESPONSE_EDITOR_CONTENT_TYPE_TAB_INDEX = 'CHANGE_RESPONSE_EDITOR_CONTENT_TYPE_TAB_INDEX'
export const changeResponseEditorContentTypeTabIndex = (index) => {
  return {
    type: CHANGE_RESPONSE_EDITOR_CONTENT_TYPE_TAB_INDEX,
    index: index
  }
}

export const INITIATE_OPENING_SESSION = 'INITIATE_OPENING_SESSION'
export const initiateOpeningSession = (filePath) => {
  return (dispatch) => {
    dispatch(applicationMenuSetSaveEnabled(false))
    return {
      type: INITIATE_OPENING_SESSION,
      filePath: filePath
    }
  }
}

export const SUCCEEDED_OPENING_SESSION = 'SUCCEEDED_OPENING_SESSION'
export const succeededOpeningSession = (session, filePath) => {
  return (dispatch) => {
    dispatch(applicationMenuSetSaveEnabled(true))
    dispatch({
      type: SUCCEEDED_OPENING_SESSION,
      session: session,
      filePath: filePath
    })
  }
}

export const FAILED_OPENING_SESSION = 'FAILED_OPENING_SESSION'
export const failedOpeningSession = (error, filePath) => {
  return (dispatch) => {
    dispatch(applicationMenuSetSaveEnabled(false))
    dispatch({
      type: FAILED_OPENING_SESSION,
      error: error,
      filePath: filePath
    })
  }
}

export const FINALIZE_OPENING_SESSION = 'FINALIZE_OPENING_SESSION'
export const finalizeOpeningSession = (filePath) => {
  setWindowNameFromFilePath(filePath)
  return {
    type: FINALIZE_OPENING_SESSION
  }
}

export const openSession = () => {
  return (dispatch) => {
    const options = {
      filters: [{
        name: 'XML',
        extensions: ['xml']
      }, {
        name: 'Charles Session',
        extensions: ['chlsx']
      }],
      properties: ['openFile']
    }
    const parentWindow = (process.platform == 'darwin') ? null : BrowserWindow.getFocusedWindow()
    dialog.showOpenDialog(parentWindow, options, (filePaths) => {
      if (filePaths !== undefined) {
        const filePath = filePaths[0]
        dispatch(parseSession(filePath))
      }
    })
  }
}

export const parseSession = (filePath) => {
  return (dispatch) => {
    dispatch(initiateOpeningSession(filePath))
    const charlesSessionDecoder = new CharlesSessionDecoder()
    charlesSessionDecoder.decode(filePath, (err, session) => {
      if (err) {
        dispatch(failedOpeningSession(err, filePath))
      } else {
        dispatch(succeededOpeningSession(session, filePath))
        if (session.transactionGroups.length > 0) {
          const transactionGroup = session.transactionGroups[0]
          const transaction = transactionGroup.transactions[0]
          dispatch(selectTransaction(transaction.id))
          dispatch(expandTransactionGroup(transactionGroup.id))
        }
      }
      dispatch(finalizeOpeningSession(filePath))
    })
  }
}

export const CLOSE_OPEN_SESSION_ERROR = 'CLOSE_OPEN_SESSION_ERROR'
export const closeOpenSessionError = () => {
  return {
    type: CLOSE_OPEN_SESSION_ERROR
  }
}

export const SUCCEEDED_SAVING_SESSION = 'FAILED_SAVING_SESSION'
export const failedSavingSession = (error) => {
  return {
    type: FAILED_SAVING_SESSION,
    error: error
  }
}

export const FAILED_SAVING_SESSION = 'SUCCEEDED_SAVING_SESSION'
export const succeededSavingSession = () => {
  return {
    type: SUCCEEDED_SAVING_SESSION
  }
}

export const CLOSE_SAVE_SESSION_ERROR = 'CLOSE_SAVE_SESSION_ERROR'
export const closeSaveSessionError = () => {
  return {
    type: CLOSE_SAVE_SESSION_ERROR
  }
}

export const saveSession = () => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(saveSessionToFilePath(state.session.filePath))
  }
}

export const saveSessionAs = () => {
  return (dispatch, getState) => {
    const state = getState()
    const options = {
      defaultPath: state.session.filePath
    }
    const parentWindow = (process.platform == 'darwin') ? null : BrowserWindow.getFocusedWindow()
    dialog.showSaveDialog(parentWindow, options, (filePath) => {
      if (filePath !== undefined) {
        dispatch(saveSessionToFilePath(filePath))
      }
    })
  }
}

export const saveSessionToFilePath = (filePath) => {
  return (dispatch, getState) => {
    const state = getState()
    const session = state.session.activeSession
    saveQueue.queue(session, filePath, (err) => {
      if (err) {
        dispatch(failedSavingSession(err))
      } else {
        setWindowNameFromFilePath(filePath)
        dispatch(succeededSavingSession())
      }
    })
  }
}

export const SELECT_TRANSACTION = 'SELECT_TRANSACTION'
export const selectTransaction = (transactionId) => {
  return {
    type: SELECT_TRANSACTION,
    transactionId: transactionId
  }
}

export const EXPAND_TRANSACTION_GROUP = 'EXPAND_TRANSACTION_GROUP'
export const expandTransactionGroup = (transactionGroupId) => {
  return {
    type: EXPAND_TRANSACTION_GROUP,
    transactionGroupId: transactionGroupId
  }
}

export const COLLAPSE_TRANSACTION_GROUP = 'COLLAPSE_TRANSACTION_GROUP'
export const collapseTransactionGroup = (transactionGroupId) => {
  return {
    type: COLLAPSE_TRANSACTION_GROUP,
    transactionGroupId: transactionGroupId
  }
}

export const DELETE_REQUEST_HEADER = 'DELETE_REQUEST_HEADER'
export const deleteRequestHeader = (idx) => {
  return {
    type: DELETE_REQUEST_HEADER,
    index: idx
  }
}

export const DELETE_REQUEST_QUERY_PARAMETER = 'DELETE_REQUEST_QUERY_PARAMETER'
export const deleteRequestQueryParameter = (idx) => {
  return {
    type: DELETE_REQUEST_QUERY_PARAMETER,
    index: idx
  }
}

export const DELETE_RESPONSE_HEADER = 'DELETE_RESPONSE_HEADER'
export const deleteResponseHeader = (idx) => {
  return {
    type: DELETE_RESPONSE_HEADER,
    index: idx
  }
}

export const CHANGE_REQUEST_HEADER_NAME = 'CHANGE_REQUEST_HEADER_NAME'
export const changeRequestHeaderName = (idx, newValue) => {
  return {
    type: CHANGE_REQUEST_HEADER_NAME,
    index: idx,
    newValue: newValue
  }
}

export const CHANGE_REQUEST_HEADER_VALUE = 'CHANGE_REQUEST_HEADER_VALUE'
export const changeRequestHeaderValue = (idx, newValue) => {
  return {
    type: CHANGE_REQUEST_HEADER_VALUE,
    index: idx,
    newValue: newValue
  }
}

export const CHANGE_REQUEST_QUERY_PARAMETER_NAME = 'CHANGE_REQUEST_QUERY_PARAMETER_NAME'
export const changeRequestQueryParameterName = (idx, newValue) => {
  return {
    type: CHANGE_REQUEST_QUERY_PARAMETER_NAME,
    index: idx,
    newValue: newValue
  }
}

export const CHANGE_REQUEST_QUERY_PARAMETER_VALUE = 'CHANGE_REQUEST_QUERY_PARAMETER_VALUE'
export const changeRequestQueryParameterValue = (idx, newValue) => {
  return {
    type: CHANGE_REQUEST_QUERY_PARAMETER_VALUE,
    index: idx,
    newValue: newValue
  }
}

export const CHANGE_RESPONSE_HEADER_NAME = 'CHANGE_RESPONSE_HEADER_NAME'
export const changeResponseHeaderName = (idx, newValue) => {
  return {
    type: CHANGE_RESPONSE_HEADER_NAME,
    index: idx,
    newValue: newValue
  }
}

export const CHANGE_RESPONSE_HEADER_VALUE = 'CHANGE_RESPONSE_HEADER_VALUE'
export const changeResponseHeaderValue = (idx, newValue) => {
  return {
    type: CHANGE_RESPONSE_HEADER_VALUE,
    index: idx,
    newValue: newValue
  }
}

export const CHANGE_REQUEST_BODY = 'CHANGE_REQUEST_BODY'
export const changeRequestBody = (body) => {
  return {
    type: CHANGE_REQUEST_BODY,
    body: body
  }
}

export const CHANGE_RESPONSE_BODY = 'CHANGE_RESPONSE_BODY'
export const changeResponseBody = (body) => {
  return {
    type: CHANGE_RESPONSE_BODY,
    body: body
  }
}

export const CHANGE_RESPONSE_STATUS_CODE = 'CHANGE_RESPONSE_STATUS_CODE'
export const changeResponseStatusCode = (statusCode) => {
  return {
    type: CHANGE_RESPONSE_STATUS_CODE,
    statusCode: statusCode
  }
}

export const CHANGE_TRANSACTION_METHOD = 'CHANGE_TRANSACTION_METHOD'
export const changeTransactionMethod = (method) => {
  return {
    type: CHANGE_TRANSACTION_METHOD,
    method: method
  }
}

export const CHANGE_TRANSACTION_URL = 'CHANGE_TRANSACTION_URL'
export const changeTransactionURL = (url) => {
  return {
    type: CHANGE_TRANSACTION_URL,
    url: url
  }
}

export const ADD_REQUEST_HEADER = 'ADD_REQUEST_HEADER'
export const addRequestHeader = () => {
  return {
    type: ADD_REQUEST_HEADER
  }
}

export const ADD_REQUEST_QUERY_PARAMETER = 'ADD_REQUEST_QUERY_PARAMETER'
export const addRequestQueryParameter = () => {
  return {
    type: ADD_REQUEST_QUERY_PARAMETER
  }
}

export const ADD_RESPONSE_HEADER = 'ADD_RESPONSE_HEADER'
export const addResponseHeader = () => {
  return {
    type: ADD_RESPONSE_HEADER
  }
}

export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const addTransaction = () => {
  return dispatch => {
    dispatch({ type: ADD_TRANSACTION })
    dispatch(closeRequestsDrawer())
  }
}

export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const deleteTransaction = (transactionId) => {
  return {
    type: DELETE_TRANSACTION,
    transactionId: transactionId
  }
}

export const applicationMenuSetSaveEnabled = (enabled) => {
  return (dispatch) => {
    ApplicationMenuManager.setSaveEnabled(enabled)
  }
}

function setWindowNameFromFilePath(filePath) {
  var filename = filePath.replace(/^.*[\\\/]/, '')
  remote.getCurrentWindow().setTitle(filename) 
}
