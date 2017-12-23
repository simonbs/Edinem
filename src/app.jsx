import React from 'react'
import ReactDOM from 'react-dom'
import { blueGrey, deepPurple } from 'material-ui/colors'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Index from './pages/index'

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
        <Index/>
      </MuiThemeProvider>
    )
  }
}

const appDom = document.getElementById('app')
ReactDOM.render(<App/>, appDom);