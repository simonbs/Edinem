import { connect } from 'react-redux'
import { openRequestsDrawer } from '../actions'
import TitleBarUI from '../components/title_bar'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onMenuClick: () => {
      dispatch(openRequestsDrawer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBarUI)