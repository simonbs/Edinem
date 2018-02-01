import { ipcRenderer } from 'electron'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import App from './containers/app'
import url from 'url'
import { 
  openSession,
  saveSession,
  saveSessionAs,
  parseSession
} from './actions'

let store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'))

ipcRenderer.on('open-file', () => {
  store.dispatch(openSession())
})

ipcRenderer.on('save-file', () => {
  store.dispatch(saveSession())
})

ipcRenderer.on('save-file-as', () => {
  store.dispatch(saveSessionAs())
})

const queryParams = url.parse(window.location.href, true).query
if (queryParams.sessionFilePath) {
  store.dispatch(parseSession(queryParams.sessionFilePath))
}