import { combineReducers } from 'redux'
import requestsDrawer from './requests_drawer'
import editPage from './edit_page'
import session from './session'

export default combineReducers({
  requestsDrawer,
  editPage,
  session
})
