import React from 'react'
import { blueGrey, deepPurple } from 'material-ui/colors'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import RequestsDrawer from '../containers/requests_drawer'
import TitleBar from '../containers/title_bar'

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
        <Grid container>
          <TitleBar title="Edinem"/>
          <span>Hello</span>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default App