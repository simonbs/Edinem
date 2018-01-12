import { connect } from 'react-redux'
import { 
  changeRequestDetailsTabIndex,
  deleteResponseHeader,
  addResponseHeader,
  changeResponseHeaderName,
  changeResponseHeaderValue,
  changeResponseBody,
  changeResponseEditorContentTypeTabIndex
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
    }),
    editorContentTypeTabIndex: state.editPage.responseEditorContentTypeTabIndex
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
      dispatch(addResponseHeader())
    },
    onBodyChange: (newValue) => {
      dispatch(changeResponseBody(newValue))
    },
    onEditorContentTypeTabIndexChange: (index) => {
      dispatch(changeResponseEditorContentTypeTabIndex(index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditResponseTabUI)
