import { connect } from 'react-redux'
import { openRequestsDrawer } from '../actions'
import TransactionUnavailablePageUI from '../components/transaction_unavailable_page'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onMenuClick: () => {
      dispatch(openRequestsDrawer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionUnavailablePageUI)
