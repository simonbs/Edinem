import React from 'react'
import { blueGrey, deepPurple } from 'material-ui/colors'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import RequestsDrawer from '../containers/requests_drawer'

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepPurple,
  }
})

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <RequestsDrawer/>
        <span>Hello</span>
      </MuiThemeProvider>
    )
  }
}

export default App