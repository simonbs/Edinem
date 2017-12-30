import { connect } from 'react-redux'
import AppUI from '../components/app'
import { closeOpenSessionError, parseSession } from '../actions'
const isDev = require('electron-is-dev')

const mapStateToProps = state => {
  return {
    showOpenSessionPage: !state.session.isOpening && state.session.activeSession == null,    
    showEditPage: !state.session.isOpening && state.session.activeSession != null,
    showLoadingPage: state.session.isOpening,
    showOpenSessionError: state.session.openError != null
  }
}

const mapDispatchToProps = dispatch => {
  if (isDev) {
    dispatch(parseSession('/Users/simonbs/Downloads/charles.xml'))
  }
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
