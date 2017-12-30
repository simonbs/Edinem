import { connect } from 'react-redux'
import { openSession } from '../actions'
import OpenSessionPageUI from '../components/open_session_page'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenSessionClick: (event, index) => {
      dispatch(openSession())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenSessionPageUI)
