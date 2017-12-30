import { connect } from 'react-redux'
import AppUI from '../components/app'
import { closeOpenSessionError } from '../actions'

const mapStateToProps = state => {
  return {
    showOpenSessionPage: state.session.activeSession == null,
    showOpenSessionError: state.session.openError != null,
    showEditPage: state.session.activeSession != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseOpenSessionError: () => {
      dispatch(closeOpenSessionError())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppUI)
