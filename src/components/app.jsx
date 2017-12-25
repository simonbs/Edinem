import React from 'react'
import { indigo, deepOrange } from 'material-ui/colors'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
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
        <Grid container>
          <TitleBar title="Edinem"/>
          <EditPage/>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default App