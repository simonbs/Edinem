import { connect } from 'react-redux'
import { changeRequestDetailsTabIndex } from '../actions'
import EditRequestTabUI from '../components/edit_request_tab'

const mapStateToProps = state => {
  return {
    detailsTabIndex: state.editPage.requestDetailsTabIndex,
    body: state.session.selectedTransaction.request.body,
    headers: state.session.selectedTransaction.request.headers.reduce((map, obj) => {
      map[obj.name] = obj.value
      return map
    }, {}),
    queryParameters: state.session.selectedTransaction.request.queryParameters.reduce((map, obj) => {
      map[obj.name] = obj.value
      return map
    }, {})
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDetailsTabIndexChange: (event, index) => {
      dispatch(changeRequestDetailsTabIndex(index))
    },
    onAddHeaderClick: () => {

    },
    onAddQueryParameterClick: () => {
      
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRequestTabUI)
