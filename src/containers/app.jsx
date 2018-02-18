import { connect } from 'react-redux'
import AppUI from '../components/app'
import { 
  closeOpenSessionError,
  closeSaveSessionError,
  parseSession
} from '../actions'
const isDev = require('electron-is-dev')

const mapStateToProps = state => {
  return {
    showOpenSessionPage: !state.session.isOpening && state.session.activeSession == null,        
    showLoadingPage: state.session.isOpening,
    showOpenSessionError: state.session.openError != null,
    showSaveSessionError: state.session.saveError != null,
    showEditPage: !state.session.isOpening 
      && state.session.activeSession != null 
      && state.session.selectedTransaction != null,
    showTransactionUnavailablePage: !state.session.isOpening
     && state.session.activeSession != null
     && state.session.selectedTransaction == null
  }
}

const mapDispatchToProps = dispatch => {
  // if (isDev) {
  //   dispatch(parseSession('/Users/simonbs/Downloads/charles.xml'))
  // }
  return {
    onCloseOpenSessionError: () => {
      dispatch(closeOpenSessionError())
    },
    onCloseSaveSessionError: () => {
      dispatch(closeSaveSessionError())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppUI)
