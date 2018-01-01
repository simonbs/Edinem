import { connect } from 'react-redux'
import {
  closeRequestsDrawer, 
  selectTransaction, 
  toggleTransactionGroupExpanded,
  deleteTransaction
} from '../actions'
import TransactionsDrawerUI from '../components/transactions_drawer'

const mapStateToProps = state => {
  return {
    open: state.transactionsDrawer.open,
    session: state.session.activeSession,
    expandedTransactionGroupIds: state.transactionsDrawer.expandedTransactionGroupIds,
    selectedTransactionGroupId: state.session.selectedTransactionGroupId,
    selectedTransactionIndex: state.session.selectedTransactionIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(closeRequestsDrawer())
    },
    onClickHeader: (transactionGroupId) => {
      dispatch(toggleTransactionGroupExpanded(transactionGroupId))
    },
    onClickItem: (transactionGroupId, transactionIndex) => {
      dispatch(selectTransaction(transactionGroupId, transactionIndex))
      dispatch(closeRequestsDrawer())
    },
    onDeleteTransactionClick: (transactionGroupId, transactionIndex) => {
      dispatch(deleteTransaction(transactionGroupId, transactionIndex))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsDrawerUI)
