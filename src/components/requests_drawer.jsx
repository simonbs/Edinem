import React from 'react'
import Drawer from 'material-ui/Drawer'
import PropTypes from 'prop-types'

class RequestsDrawer extends React.Component {
  render() {
    return (
      <Drawer anchor="top" open={this.requestsDrawerOpen}>
        <span>Test</span>
      </Drawer>
    )
  }
}

RequestsDrawer.propTypes = {
  open: PropTypes.bool.isRequired
}

export default RequestsDrawer