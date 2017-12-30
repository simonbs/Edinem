import { connect } from 'react-redux'
import { closeRequestsDrawer } from '../actions'
import TransactionsDrawerUI from '../components/transactions_drawer'

const mapStateToProps = state => {
  return {
    open: state.requestsDrawer.open,
    session: state.session.activeSession
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(closeRequestsDrawer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsDrawerUI)
