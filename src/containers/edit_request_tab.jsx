import { connect } from 'react-redux'
import {
  changeRequestDetailsTabIndex,
  changeRequestHeaderName,
  changeRequestHeaderValue,
  deleteRequestHeader,
  addRequestHeader,
  changeRequestQueryParameterName,
  changeRequestQueryParameterValue,
  deleteRequestQueryParameter,
  addRequestQueryParameter,
  changeRequestBody,
  changeRequestEditorContentTypeTabIndex
} from '../actions'
import EditRequestTabUI from '../components/edit_request_tab'

const mapStateToProps = state => {
  return {
    detailsTabIndex: state.editPage.requestDetailsTabIndex,
    body: state.session.selectedTransaction.request.body,
    headers: state.session.selectedTransaction.request.headers.map((header) => {
      return {
        id: header.id,
        key: header.name,
        value: header.value
      }
    }),
    queryParameters: state.session.selectedTransaction.request.queryParameters.map((queryParameter) => {
      return {
        id: queryParameter.id,
        key: queryParameter.name,
        value: queryParameter.value
      }
    }),
    editorContentTypeTabIndex: state.editPage.requestEditorContentTypeTabIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDetailsTabIndexChange: (index) => {
      dispatch(changeRequestDetailsTabIndex(index))
    },
    onHeaderNameChange: (idx, newValue) => {
      dispatch(changeRequestHeaderName(idx, newValue))
    },
    onHeaderValueChange: (idx, newValue) => {
      dispatch(changeRequestHeaderValue(idx, newValue))
    },
    onDeleteHeaderClick: (idx) => {
      dispatch(deleteRequestHeader(idx))
    },
    onAddHeaderClick: () => {
      dispatch(addRequestHeader())
    },
    onQueryParameterNameChange: (idx, newValue) => {
      dispatch(changeRequestQueryParameterName(idx, newValue))
    },
    onQueryParameterValueChange: (idx, newValue) => {
      dispatch(changeRequestQueryParameterValue(idx, newValue))
    },
    onDeleteQueryParameterClick: (idx) => {
      dispatch(deleteRequestQueryParameter(idx))
    },
    onAddQueryParameterClick: () => {
      dispatch(addRequestQueryParameter())
    },
    onBodyChange: (newValue) => {
      dispatch(changeRequestBody(newValue))
    },
    onEditorContentTypeTabIndexChange: (index) => {
      dispatch(changeRequestEditorContentTypeTabIndex(index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRequestTabUI)
