import React from 'react'
import PropTypes from 'prop-types'
import { indigo, deepOrange } from 'material-ui/colors'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import OpenSessionPage from '../containers/open_session_page'
import EditPage from '../containers/edit_page'
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
            {this.props.showLoadingPage && <LoadingPage/>}
            <ErrorDialog 
            open={this.props.showOpenSessionError}
            onClose={this.props.onCloseOpenSessionError}
            text="The session could not be opened."/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  showOpenSessionPage: PropTypes.bool.isRequired,
  showOpenSessionError: PropTypes.bool.isRequired,
  showLoadingPage: PropTypes.bool.isRequired,
  onCloseOpenSessionError: PropTypes.func.isRequired,
  showEditPage: PropTypes.bool.isRequired
}

export default App