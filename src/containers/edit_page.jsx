import { connect } from 'react-redux'
import { changeRequestResponseTabIndex } from '../actions'
import EditPageUI from '../components/edit_page'

const mapStateToProps = state => {
  return {
    requestResponseTabIndex: state.editPage.requestResponseTabIndex,
    requestDetailsTabIndex: state.editPage.requestDetailsTabIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestResponseTabIndexChange: (event, index) => {
      dispatch(changeRequestResponseTabIndex(index))
    },
    onRequestDetailsTabIndexChange: (event, index) => {
      dispatch(changeRequestDetailsTabIndex(index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPageUI)
