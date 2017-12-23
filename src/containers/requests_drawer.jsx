import { connect } from 'react-redux'
import RequestDrawerUI from '../components/requests_drawer'

const mapStateToProps = state => {
  return {
    open: state.requestsDrawer.open
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestDrawerUI)