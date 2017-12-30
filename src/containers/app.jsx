import { connect } from 'react-redux'
import AppUI from '../components/app'

const mapStateToProps = state => {
  return {
    showOpenSessionPage: state.session.activeSession == null,
    showEditPage: state.session.activeSession != null
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppUI)
