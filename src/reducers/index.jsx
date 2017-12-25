import { combineReducers } from 'redux'
import requestsDrawer from './requests_drawer'
import editPage from './edit_page'

export default combineReducers({
  requestsDrawer,
  editPage
})
