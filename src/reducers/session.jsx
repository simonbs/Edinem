import { 
  INITIATE_OPENING_SESSION,
  SUCCEEDED_OPENING_SESSION,
  FAILED_OPENING_SESSION,
  FINALIZE_OPENING_SESSION,
  CLOSE_OPEN_SESSION_ERROR,
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
  CHANGE_RESPONSE_BODY
} from '../actions'

const initialState = {
  isOpening: false,
  activeSession: null,
  openError: null,
  selectedTransactionGroupId: null,
  selectedTransactionIndex: null,
  selectedTransaction: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_OPENING_SESSION:
      return {
        ...state,
        isOpening: true
      }
    case SUCCEEDED_OPENING_SESSION:      
      return {
        ...state,
        activeSession: action.session,
        openError: null
      }
    case FAILED_OPENING_SESSION:
      return {
        ...state,
        activeSession: null,
        openError: action.error,
        selectedTransactionGroupId: null,
        selectedTransactionIndex: null,
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
    case SELECT_TRANSACTION: {
      // Copy currently selected transaction back into session
      if (state.selectedTransactionGroupId != null 
          && state.selectedTransactionIndex != null 
          && state.selectedTransaction != null) {
            state.activeSession.replaceTransaction(
              state.selectedTransactionGroupId,
              state.selectedTransactionIndex,
              state.selectedTransaction)
      }
      // Find new transaction
      let selectedTransaction = state.activeSession.findTransaction(
        action.transactionGroupId,
        action.transactionIndex)
      return {
        ...state,
        selectedTransactionGroupId: action.transactionGroupId,
        selectedTransactionIndex: action.transactionIndex,
        selectedTransaction: selectedTransaction
      }
    }
    case DELETE_REQUEST_HEADER: {
      state.selectedTransaction.request.deleteHeader(action.index)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case DELETE_REQUEST_QUERY_PARAMETER: {
      state.selectedTransaction.request.deleteQueryParameter(action.index)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case DELETE_RESPONSE_HEADER: {
      state.selectedTransaction.response.deleteHeader(action.index)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_REQUEST_HEADER_NAME: {
      state.selectedTransaction.request.changeHeaderName(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_REQUEST_HEADER_VALUE: {
      state.selectedTransaction.request.changeHeaderValue(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_REQUEST_QUERY_PARAMETER_NAME: {
      state.selectedTransaction.request.changeQueryParameterName(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_REQUEST_QUERY_PARAMETER_VALUE: {
      state.selectedTransaction.request.changeQueryParameterValue(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_RESPONSE_HEADER_NAME: {
      state.selectedTransaction.response.changeHeaderName(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_RESPONSE_HEADER_VALUE: {
      state.selectedTransaction.response.changeHeaderValue(action.index, action.newValue)
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_REQUEST_BODY: {
      state.selectedTransaction.request.body = action.newValue
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    case CHANGE_RESPONSE_BODY: {
      state.selectedTransaction.response.body = action.newValue
      return {
        ...state,
        selectedTransaction: state.selectedTransaction
      }
    }
    default:
      return state
  }
}