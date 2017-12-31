import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import EditKeyValuePairs from './edit_key_value_pairs'
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

class EditRequestTab extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <div>
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
            {this.props.detailsTabIndex === 0 && <EditKeyValuePairs pairs={this.props.headers} />}
            {this.props.detailsTabIndex === 1 && <EditKeyValuePairs pairs={this.props.queryParameters} />}
          </div>
        </div>
        <div className={this.props.classes.bodyContainer}>
          <Editor value={this.props.body || ""} />
        </div>
      </div>
    )
  }
}

EditRequestTab.propTypes = {
  detailsTabIndex: PropTypes.number.isRequired,
  onDetailsTabIndexChange: PropTypes.func.isRequired,
  body: PropTypes.string,
  headers: PropTypes.object.isRequired,
  queryParameters: PropTypes.object.isRequired
}

EditRequestTab.defaultProps = {
  headers: {},
  queryParameters: {}
}

export default withStyles(styles)(EditRequestTab)
