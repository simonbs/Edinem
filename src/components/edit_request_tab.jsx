import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import EditHeaders from './edit_headers'
import Editor from './editor'

const styles = {
  wrapper: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%'
  },
  urlContainer: {
    padding: 12,
    paddingLeft: 24,
    paddingRight: 24
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

class EditRequestTab extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <div>
          <div className={this.props.classes.urlContainer}>
            <TextField label="URL" placeholder="URL" fullWidth />
          </div>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs
              value={this.props.detailsTabIndex}
              onChange={this.props.onDetailsTabIndexChange}
              centered>
              <Tab label="Headers" />
              <Tab label="Query" />
            </Tabs>
          </AppBar>
          <div className={this.props.classes.tabsContainer}>
            {this.props.detailsTabIndex === 0 && <EditHeaders />}
            {this.props.detailsTabIndex === 1 && <div>Query</div>}
          </div>
        </div>
        <div className={this.props.classes.bodyContainer}>
          <Editor/>
        </div>
      </div>
    )
  }
}

EditRequestTab.propTypes = {
  detailsTabIndex: PropTypes.number.isRequired,
  onDetailsTabIndexChange: PropTypes.func.isRequired
}

export default withStyles(styles)(EditRequestTab)
