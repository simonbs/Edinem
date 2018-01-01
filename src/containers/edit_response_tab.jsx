import { connect } from 'react-redux'
import { 
  changeRequestDetailsTabIndex,
  deleteResponseHeader,
  changeResponseHeaderName,
  changeResponseHeaderValue,
  changeResponseBody
} from '../actions'
import EditResponseTabUI from '../components/edit_response_tab'

const mapStateToProps = state => {
  return {
    body: state.session.selectedTransaction.response.body,
    headers: state.session.selectedTransaction.response.headers.map((header) => {
      return {
        id: header.id,
        key: header.name,
        value: header.value
      }
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHeaderNameChange: (idx, newValue) => {
      dispatch(changeResponseHeaderName(idx, newValue))
    },
    onHeaderValueChange: (idx, newValue) => {
      dispatch(changeResponseHeaderValue(idx, newValue))
    },
    onDeleteHeaderClick: (idx) => {
      dispatch(deleteResponseHeader(idx))
    },
    onAddHeaderClick: () => {
      
    },
    onBodyChange: (newValue) => {
      dispatch(changeResponseBody(newValue))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditResponseTabUI)
