import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import EditRequestTab from '../containers/edit_request_tab'
import EditResponseTab from './edit_response_tab'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

class EditPage extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
        <div style={{ display: 'flex', flex: '0 1 auto' }}>
          <AppBar position="static" elevation={0}>
            <Tabs 
            value={this.props.requestResponseTabIndex} 
            onChange={this.props.onRequestResponseTabIndexChange} 
            centered>
              <Tab label="Request" />
              <Tab label="Response" />
            </Tabs>
          </AppBar>
        </div>
        <div style={{ display: 'flex', flex: '1 1 auto' }}>
          {this.props.requestResponseTabIndex === 0 && <EditRequestTab/>}
          {this.props.requestResponseTabIndex === 1 && <EditResponseTab/>}
        </div>
      </div>
    )
  }
}

EditPage.propTypes = {
  requestResponseTabIndex: PropTypes.number.isRequired,
  onRequestResponseTabIndexChange: PropTypes.func.isRequired
}

export default EditPage
