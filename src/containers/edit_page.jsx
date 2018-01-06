import { connect } from 'react-redux'
import { 
  changeRequestResponseTabIndex,
  openRequestsDrawer,
  changeTransactionMethod,
  changeTransactionURL,
  changeResponseStatusCode
} from '../actions'
import EditPageUI from '../components/edit_page'

const mapStateToProps = state => {
  return {
    requestResponseTabIndex: state.editPage.requestResponseTabIndex,
    requestDetailsTabIndex: state.editPage.requestDetailsTabIndex,
    transactionId: state.session.selectedTransaction.id,
    method: state.session.selectedTransaction.method,
    url: state.session.selectedTransaction.getFullURL(),
    statusCode: state.session.selectedTransaction.response.statusCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestResponseTabIndexChange: (event, index) => {
      dispatch(changeRequestResponseTabIndex(index))
    },
    onRequestDetailsTabIndexChange: (event, index) => {
      dispatch(changeRequestDetailsTabIndex(index))
    },
    onMenuClick: () => {
      dispatch(openRequestsDrawer())
    },
    onMethodChange: (method) => {
      dispatch(changeTransactionMethod(method))
    },
    onURLChange: (url) => {
      dispatch(changeTransactionURL(url))
    },
    onStatusCodeChange: (statusCode) => {
      dispatch(changeResponseStatusCode(statusCode))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPageUI)
