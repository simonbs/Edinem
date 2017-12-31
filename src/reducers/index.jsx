import { combineReducers } from 'redux'
import transactionsDrawer from './transactions_drawer'
import editPage from './edit_page'
import session from './session'

export default combineReducers({
  transactionsDrawer,
  editPage,
  session
})
