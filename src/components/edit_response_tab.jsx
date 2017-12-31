import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import EditHeaders from './edit_headers'
import Editor from './editor'

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
    padding: 0,
    display: 'flex',
    flex: '1 1 auto',
    backgroundColor: 'orange'
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
          <EditHeaders headers={this.props.headers} />
        </div>
        <div className={this.props.classes.bodyContainer}>
          <Editor value={this.props.body || ""} />
        </div>
      </div>
    )
  }
}

EditResponseTab.propTypes = {
  body: PropTypes.string,
  headers: PropTypes.array.isRequired
}

EditResponseTab.defaultProps = {
  headers: []
}

export default withStyles(styles)(EditResponseTab)