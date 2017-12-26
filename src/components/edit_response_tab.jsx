import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import EditHeaders from './edit_headers'

const styles = {
  wrapper: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%'
  },
  tabsContainer: {
    maxHeight: '250px',
    overflow: 'auto'
  },
  bodyContainer: {
    padding: 12,
    paddingLeft: 24,
    paddingRight: 24,
    flex: '1 1 auto'
  }
}

class EditResponseTab extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs value={0} centered>
            <Tab label="Headers" />
          </Tabs>
        </AppBar>
        <div className={this.props.classes.tabsContainer}>
          <EditHeaders/>
        </div>
        <div className={this.props.classes.bodyContainer}>
          Fill rest
        </div>
      </div>
    )
  }
}

EditResponseTab.propTypes = {}

export default withStyles(styles)(EditResponseTab)