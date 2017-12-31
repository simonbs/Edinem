import { 
  INITIATE_OPENING_SESSION,
  SUCCEEDED_OPENING_SESSION,
  FAILED_OPENING_SESSION,
  FINALIZE_OPENING_SESSION,
  CLOSE_OPEN_SESSION_ERROR,
  SELECT_TRANSACTION
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
    case SELECT_TRANSACTION:      
      var selectedTransaction = null
      for (const transactionGroup of state.activeSession.transactionGroups) {
        if (transactionGroup.id == action.transactionGroupId) {
          selectedTransaction = transactionGroup.transactions[action.transactionIndex]
          break
        }
      }
      return {
        ...state,
        selectedTransactionGroupId: action.transactionGroupId,
        selectedTransactionIndex: action.transactionIndex,
        selectedTransaction: selectedTransaction
      }
    default:
      return state
  }
}