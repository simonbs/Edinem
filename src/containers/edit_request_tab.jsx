import { connect } from 'react-redux'
import { changeRequestDetailsTabIndex } from '../actions'
import EditRequestTabUI from '../components/edit_request_tab'

const mapStateToProps = state => {
  return {
    detailsTabIndex: state.editPage.requestDetailsTabIndex,
    url: state.session.selectedTransaction.getFullURL(),
    body: state.session.selectedTransaction.request.body
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDetailsTabIndexChange: (event, index) => {
      dispatch(changeRequestDetailsTabIndex(index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRequestTabUI)
