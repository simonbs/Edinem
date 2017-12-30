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
  selectedTransactionIndex: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_OPENING_SESSION:
      return {
        ...state,
        isOpening: true,
        selectedTransactionGroupId: null,
        selectedTransactionIndex: null
      }
    case SUCCEEDED_OPENING_SESSION:
      let selectedTransactionGroupId = null
      let selectedTransactionIndex = null
      if (action.session.transactionGroups.length > 0) {
        const transactionGroup = action.session.transactionGroups[0]
        selectedTransactionGroupId = transactionGroup.id
        selectedTransactionIndex = 0
      }
      return {
        ...state,
        isOpening: false,
        activeSession: action.session,
        openError: null,
        selectedTransactionGroupId: selectedTransactionGroupId,
        selectedTransactionIndex: selectedTransactionIndex
      }
    case FAILED_OPENING_SESSION:
      return {
        ...state,
        isOpening: false,
        activeSession: null,
        openError: action.error,
        selectedTransactionGroupId: null,
        selectedTransactionIndex: null
      }
    case CLOSE_OPEN_SESSION_ERROR:
      return {
        ...state,
        openError: null
      }
    case SELECT_TRANSACTION:
      return {
        ...state,
        selectedTransactionGroupId: action.transactionGroupId,
        selectedTransactionIndex: action.transactionIndex
      }
    default:
      return state
  }
}