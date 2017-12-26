import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
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

const styles = {
  wrapper: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%'
  },
  fixedHeight: {
    display: 'flex',
    flex: '0 1 auto'
  },
  dynamicHeight: {
    display: 'flex',
    flex: '1 1 auto'
  }
}

class EditPage extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <div className={this.props.classes.fixedHeight}>
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
        <div className={this.props.classes.dynamicHeight}>
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

export default withStyles(styles)(EditPage)
