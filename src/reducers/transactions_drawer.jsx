import {
  OPEN_REQUESTS_DRAWER,
  CLOSE_REQUESTS_DRAWER,
  SUCCEEDED_OPENING_SESSION,
  FAILED_OPENING_SESSION,
  EXPAND_TRANSACTION_GROUP,
  COLLAPSE_TRANSACTION_GROUP
} from '../actions'

const initialState = {
  open: false,
  expandedTransactionGroupIds: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_REQUESTS_DRAWER:
      return {
        ...state,
        open: true
      }
    case CLOSE_REQUESTS_DRAWER:
      return {
        ...state,
        open: false
      }
    case SUCCEEDED_OPENING_SESSION:
      return {
        ...state,
        expandedTransactionGroupIds: []
      }
    case FAILED_OPENING_SESSION:
      return {
        ...state,
        expandedTransactionGroupIds: []
      }
    case EXPAND_TRANSACTION_GROUP: {
      let expandedTransactionGroupIds = state.expandedTransactionGroupIds
      const idx = expandedTransactionGroupIds.indexOf(action.transactionGroupId)
      if (idx == -1) {
        expandedTransactionGroupIds.push(action.transactionGroupId)
      }
      return {
        ...state,
        expandedTransactionGroupIds: expandedTransactionGroupIds
      }
    }
    case COLLAPSE_TRANSACTION_GROUP: {
      let expandedTransactionGroupIds = state.expandedTransactionGroupIds
      const idx = expandedTransactionGroupIds.indexOf(action.transactionGroupId)
      if (idx != -1) {        
        expandedTransactionGroupIds.splice(idx, 1)
      }
      return {
        ...state,
        expandedTransactionGroupIds: expandedTransactionGroupIds
      }
    }
    default:
      return state
  }
}