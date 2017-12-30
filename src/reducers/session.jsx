import { 
  INITIATE_OPENING_SESSION,
  SUCCEEDED_OPENING_SESSION,
  FAILED_OPENING_SESSION,
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
      var selectedTransactionGroupId = null
      var selectedTransactionIndex = null
      var selectedTransaction = null
      if (action.session.transactionGroups.length > 0) {
        const transactionGroup = action.session.transactionGroups[0]
        selectedTransactionGroupId = transactionGroup.id
        selectedTransactionIndex = 0
        selectedTransaction = transactionGroup.transactions[0]
      }
      return {
        ...state,
        isOpening: false,
        activeSession: action.session,
        openError: null,
        selectedTransactionGroupId: selectedTransactionGroupId,
        selectedTransactionIndex: selectedTransactionIndex,
        selectedTransaction: selectedTransaction
      }
    case FAILED_OPENING_SESSION:
      return {
        ...state,
        isOpening: false,
        activeSession: null,
        openError: action.error,
        selectedTransactionGroupId: null,
        selectedTransactionIndex: null,
        selectedTransaction: null
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