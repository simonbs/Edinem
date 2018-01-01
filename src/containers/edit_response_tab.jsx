import { connect } from 'react-redux'
import { changeRequestDetailsTabIndex, deleteResponseHeader } from '../actions'
import EditResponseTabUI from '../components/edit_response_tab'

const mapStateToProps = state => {
  return {
    body: state.session.selectedTransaction.response.body,
    headers: state.session.selectedTransaction.response.headers.reduce((map, obj) => {
      map[obj.name] = obj.value
      return map
    }, {})
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteHeaderClick: (idx) => {
      dispatch(deleteResponseHeader(idx))
    },
    onAddHeaderClick: () => {
      
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditResponseTabUI)
