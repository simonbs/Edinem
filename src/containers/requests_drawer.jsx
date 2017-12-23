import { connect } from 'react-redux'
import { closeRequestsDrawer } from '../actions'
import RequestDrawerUI from '../components/requests_drawer'

const mapStateToProps = state => {
  return {
    open: state.requestsDrawer.open
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(closeRequestsDrawer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestDrawerUI)
