const URLParser = require('../lib/url_parser')
import {
  INITIATE_OPENING_SESSION,
  SUCCEEDED_OPENING_SESSION,
  FAILED_OPENING_SESSION,
  FINALIZE_OPENING_SESSION,
  CLOSE_OPEN_SESSION_ERROR,
  SUCCEEDED_SAVING_SESSION,
  FAILED_SAVING_SESSION,
  CLOSE_SAVE_SESSION_ERROR,
  SELECT_TRANSACTION,
  DELETE_REQUEST_HEADER,
  DELETE_REQUEST_QUERY_PARAMETER,
  DELETE_RESPONSE_HEADER,
  CHANGE_REQUEST_HEADER_NAME,
  CHANGE_REQUEST_HEADER_VALUE,
  CHANGE_REQUEST_QUERY_PARAMETER_NAME,
  CHANGE_REQUEST_QUERY_PARAMETER_VALUE,
  CHANGE_RESPONSE_HEADER_NAME,
  CHANGE_RESPONSE_HEADER_VALUE,
  CHANGE_REQUEST_BODY,
  CHANGE_RESPONSE_BODY,
  CHANGE_RESPONSE_STATUS_CODE,
  CHANGE_TRANSACTION_METHOD,
  CHANGE_TRANSACTION_URL,
  ADD_REQUEST_HEADER,
  ADD_REQUEST_QUERY_PARAMETER,
  ADD_RESPONSE_HEADER,
  ADD_TRANSACTION,
  DELETE_TRANSACTION
} from '../actions'

const initialState = {
  isOpening: false,
  filePath: null,
  activeSession: null,
  openError: null,
  saveError: null,
  selectedTransactionId: null,
  selectedTransaction: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_OPENING_SESSION:
      return {
        ...state,
        isOpening: true,
        filePath: action.filePath
      }
    case SUCCEEDED_OPENING_SESSION:
      return {
        ...state,
        activeSession: action.session,
        filePath: action.filePath,
        openError: null      
      }
    case FAILED_OPENING_SESSION:
      return {
        ...state,
        filePath: null,
        activeSession: null,
        openError: action.error,
        selectedTransactionId: null,
        selectedTransaction: null
      }
    case FINALIZE_OPENING_SESSION:
      return {
        ...state,
        isOpening: false
      }
    case CLOSE_OPEN_SESSION_ERROR:
      return {
        ...state,
        openError: null
      }
    case SUCCEEDED_SAVING_SESSION:
      return {
        ...state,
        saveError: null
      }
    case FAILED_SAVING_SESSION:
      return {
        ...state,
        saveError: action.error
      }
    case CLOSE_SAVE_SESSION_ERROR:
      return {
        ...state,
        saveError: null
      }
    case SELECT_TRANSACTION: {
      // Copy currently selected transaction back into session
      if (state.selectedTransactionId != null && state.selectedTransaction != null) {
        state.activeSession.replaceTransaction(
          state.selectedTransactionId,
          state.selectedTransaction)
      }
      // Find new transaction
      let selectedTransaction = state.activeSession.findTransaction(action.transactionId)
      return {
        ...state,
        selectedTransactionId: action.transactionId,
        selectedTransaction: selectedTransaction
      }
    }
    case DELETE_REQUEST_HEADER:
      state.selectedTransaction.request.deleteHeader(action.index)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case DELETE_REQUEST_QUERY_PARAMETER:
      state.selectedTransaction.request.deleteQueryParameter(action.index)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case DELETE_RESPONSE_HEADER:
      state.selectedTransaction.response.deleteHeader(action.index)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_REQUEST_HEADER_NAME:
      state.selectedTransaction.request.changeHeaderName(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_REQUEST_HEADER_VALUE:
      state.selectedTransaction.request.changeHeaderValue(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_REQUEST_QUERY_PARAMETER_NAME:
      state.selectedTransaction.request.changeQueryParameterName(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_REQUEST_QUERY_PARAMETER_VALUE:
      state.selectedTransaction.request.changeQueryParameterValue(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_RESPONSE_HEADER_NAME:
      state.selectedTransaction.response.changeHeaderName(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_RESPONSE_HEADER_VALUE:
      state.selectedTransaction.response.changeHeaderValue(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_REQUEST_BODY:
      state.selectedTransaction.request.body = action.body
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_RESPONSE_BODY:
      state.selectedTransaction.response.body = action.body
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_RESPONSE_STATUS_CODE:
      state.selectedTransaction.response.statusCode = action.statusCode
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_TRANSACTION_METHOD:
      state.selectedTransaction.method = action.method
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case CHANGE_TRANSACTION_URL:
      const oldComponents = new URLParser().parseURL(state.selectedTransaction.getFullURL())
      const newComponents = new URLParser().parseURL(action.url)
      state.selectedTransaction.protocol = newComponents.protocol
      state.selectedTransaction.host = newComponents.host
      state.selectedTransaction.port = newComponents.port
      state.selectedTransaction.path = newComponents.path
      if (newComponents.protocol != oldComponents.protocol
        || newComponents.host != oldComponents.host
        || newComponents.port != oldComponents.port) {
          state.activeSession.regroupTransactions()
      }      
      return {
        ...state,
        activeSession: state.activeSession,
        selectedTransaction: state.selectedTransaction
      }
    case ADD_REQUEST_HEADER:
      state.selectedTransaction.request.addHeader()
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case ADD_REQUEST_QUERY_PARAMETER:
      state.selectedTransaction.request.addQueryParameter()
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case ADD_RESPONSE_HEADER:
      state.selectedTransaction.response.addHeader()
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    case ADD_TRANSACTION:
      const transaction = state.activeSession.addTransaction()
      return {
        ...state,
        session: state.activeSession,
        selectedTransactionId: transaction.id,
        selectedTransaction: transaction
      }
    case DELETE_TRANSACTION:
      state.activeSession.deleteTransaction(action.transactionId)
      let isSelectedTransaction = state.selectedTransactionId == action.transactionId
      if (isSelectedTransaction) {
        return {
          ...state,
          session: state.activeSession,
          selectedTransactionId: null,
          selectedTransaction: null
        }
      } else {
        return {
          ...state,
          session: state.activeSession
        }
      }
    default:
      return state
  }
}