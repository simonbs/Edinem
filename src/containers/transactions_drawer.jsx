import { connect } from 'react-redux'
import {
  closeRequestsDrawer, 
  expandTransactionGroup,
  collapseTransactionGroup,
  selectTransaction, 
  addTransaction,
  deleteTransaction
} from '../actions'
import TransactionsDrawerUI from '../components/transactions_drawer'

const mapStateToProps = state => {
  return {
    open: state.transactionsDrawer.open,
    session: state.session.activeSession,
    expandedTransactionGroupIds: state.transactionsDrawer.expandedTransactionGroupIds,
    selectedTransactionId: state.session.selectedTransactionId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(closeRequestsDrawer())
    },
    onExpandTransactionGroup: (transactionGroupId) => {
      dispatch(expandTransactionGroup(transactionGroupId))
    },
    onCollapseTransactionGroup: (transactionGroupId) => {
      dispatch(collapseTransactionGroup(transactionGroupId))
    },
    onSelectTransaction: (transactionId) => {
      dispatch(selectTransaction(transactionId))
      dispatch(closeRequestsDrawer())
    },
    onAddTransaction: () => {
      dispatch(addTransaction())
    },
    onDeleteTransaction: (transactionId) => {
      dispatch(deleteTransaction(transactionId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsDrawerUI)
