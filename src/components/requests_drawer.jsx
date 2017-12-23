import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'

class RequestsDrawer extends React.Component {
  render() {
    return (
      <Drawer anchor="top" open={this.props.open} onClose={this.props.onClose}>
        <span>Test</span>
      </Drawer>
    )
  }
}

RequestsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default RequestsDrawer