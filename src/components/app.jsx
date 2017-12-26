import React from 'react'
import { indigo, deepOrange } from 'material-ui/colors'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import RequestsDrawer from '../containers/requests_drawer'
import TitleBar from '../containers/title_bar'
import EditPage from '../containers/edit_page'

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
        <RequestsDrawer/>
        <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
          <div style={{ display: 'flex', flex: '0 1 auto' }}>
            <TitleBar title="Edinem" style={{ flex: '0 1 auto' }} />
          </div>
          <div style={{ display: 'flex', flex: '1 1 auto' }}>
          <EditPage/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App