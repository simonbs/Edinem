import React from 'react'
import PropTypes from 'prop-types'
import { indigo, deepOrange } from 'material-ui/colors'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import OpenSessionPage from '../containers/open_session_page'
import EditPage from '../containers/edit_page'
import TransactionUnavailablePage from '../containers/transaction_unavailable_page'
import ErrorDialog from '../components/error_dialog'
import LoadingPage from '../components/loading_page'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange
  }
})

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
          <div style={{ display: 'flex', flex: '1 1 auto' }}>
            {this.props.showOpenSessionPage && <OpenSessionPage/>}
            {this.props.showEditPage && <EditPage/>}
            {this.props.showTransactionUnavailablePage && <TransactionUnavailablePage/>}
            {this.props.showLoadingPage && <LoadingPage/>}
            <ErrorDialog 
            open={this.props.showOpenSessionError}
            onClose={this.props.onCloseOpenSessionError}
            text="The session could not be opened."/>
             <ErrorDialog 
            open={this.props.showSaveSessionError}
            onClose={this.props.onCloseSaveSessionError}
            text="The session could not be saved. Please try again."/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  showOpenSessionPage: PropTypes.bool.isRequired,
  showOpenSessionError: PropTypes.bool.isRequired,
  showSaveSessionError: PropTypes.bool.isRequired,
  showLoadingPage: PropTypes.bool.isRequired,
  onCloseOpenSessionError: PropTypes.func.isRequired,
  onCloseSaveSessionError: PropTypes.func.isRequired,
  showEditPage: PropTypes.bool.isRequired,
  showTransactionUnavailablePage: PropTypes.bool.isRequired
}

export default App