import { connect } from 'react-redux'
import { changeRequestResponseTabIndex, openRequestsDrawer } from '../actions'
import EditPageUI from '../components/edit_page'

const mapStateToProps = state => {
  return {
    requestResponseTabIndex: state.editPage.requestResponseTabIndex,
    requestDetailsTabIndex: state.editPage.requestDetailsTabIndex,
    method: state.session.selectedTransaction.method,
    url: state.session.selectedTransaction.getFullURL()
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPageUI)
