import { connect } from 'react-redux'
import {
  closeRequestsDrawer, 
  selectTransaction, 
  toggleTransactionGroupExpanded
} from '../actions'
import TransactionsDrawerUI from '../components/transactions_drawer'

const mapStateToProps = state => {
  return {
    open: state.transactionsDrawer.open,
    session: state.session.activeSession,
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsDrawerUI)
