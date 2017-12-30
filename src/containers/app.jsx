import { connect } from 'react-redux'
import AppUI from '../components/app'
import { closeOpenSessionError } from '../actions'

const mapStateToProps = state => {
  return {
    showOpenSessionPage: !state.session.isOpening && state.session.activeSession == null,    
    showEditPage: !state.session.isOpening && state.session.activeSession != null,
    showLoadingPage: state.session.isOpening,
    showOpenSessionError: state.session.openError != null
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
