import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import EditKeyValuePairs from './edit_key_value_pairs'
import Editor from './editor'
import AlertDialog from './alert_dialog'

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%'
  },
  tabsContainer: {
    maxHeight: '250px',
    overflow: 'auto'
  },
  bodySeparator: {
    height: 1,
    backgroundColor: grey[500]
  },
  bodyContainer: {
    padding: 0,
    display: 'flex',
    flex: '1 1 auto'
  }
})

class EditRequestTab extends React.Component {
  state = {
    headerDeletionIndex: null,
    headerDeletionName: null,
    queryParameterDeletionIndex: null,
    queryParameterDeletionName: null
  }

  promptDeleteHeader = (idx, name, value) => {
    if (name == null && value == null) {
      this.props.onDeleteHeaderClick(idx)
    } else {
      this.setState({
        ...this.state,
        headerDeletionIndex: idx,
        headerDeletionName: name
      })
    }
  }

  deleteHeaderPromptConfirm = () => {
    this.props.onDeleteHeaderClick(this.state.headerDeletionIndex)
    this.setState({
      ...this.state,
      headerDeletionIndex: null
    })    
  }

  deleteHeaderPromptCancel = () => {
    this.setState({
      ...this.state,
      headerDeletionIndex: null
    })
  }

  promptDeleteQueryParameter = (idx, name, value) => {
    if (name == null && value == null) {
      this.props.onDeleteQueryParameterClick(idx)
    } else {
      this.setState({
        ...this.state,
        queryParameterDeletionIndex: idx,
        queryParameterDeletionName: name
      })
    }
  }

  deleteQueryParameterPromptConfirm = () => {
    this.props.onDeleteQueryParameterClick(this.state.queryParameterDeletionIndex)
    this.setState({
      ...this.state,
      queryParameterDeletionIndex: null
    })    
  }

  deleteQueryParameterPromptCancel = () => {
    this.setState({
      ...this.state,
      queryParameterDeletionIndex: null
    })
  }

  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <div>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs
              value={this.props.detailsTabIndex}
              onChange={this.props.onDetailsTabIndexChange}
              centered>
              <Tab label="Headers" tabIndex="-1" />
              <Tab label="Query" tabIndex="-1" />
            </Tabs>
          </AppBar>
          <div className={this.props.classes.tabsContainer}>
            {this.props.detailsTabIndex === 0 && 
              <EditKeyValuePairs 
              pairs={this.props.headers}
              addTitle="Add header"
              onKeyChange={this.props.onHeaderNameChange}
              onValueChange={this.props.onHeaderValueChange}
              onDeleteClick={this.promptDeleteHeader}
              onAddClick={this.props.onAddHeaderClick} />
            }
            {this.props.detailsTabIndex === 1 &&
              <EditKeyValuePairs
              pairs={this.props.queryParameters}
              addTitle="Add query parameter"
              onKeyChange={this.props.onQueryParameterNameChange}
              onValueChange={this.props.onQueryParameterValueChange}
              onDeleteClick={this.promptDeleteQueryParameter}
              onAddClick={this.props.onAddQueryParameterClick} />
            }
          </div>
        </div>
        <div className={this.props.classes.bodySeparator} />
        <div className={this.props.classes.bodyContainer}>
          <Editor
          value={this.props.body || ""}
          onChange={(newValue, e) => this.props.onBodyChange(newValue)} />
        </div>
        <AlertDialog
        open={this.state.headerDeletionIndex != null}
        title={
          this.state.headerDeletionName != null
          ? `Delete header \"${this.state.headerDeletionName}\"?`
          : `Delete header?`
        }
        message="Are you sure you want to delete the header?"
        confirmTitle="Delete"
        onConfirm={this.deleteHeaderPromptConfirm}
        onCancel={this.deleteHeaderPromptCancel}
        destructiveConfirm />
        <AlertDialog
        open={this.state.queryParameterDeletionIndex != null}
        title={
          this.state.queryParameterDeletionName != null
          ? `Delete query parameter \"${this.state.queryParameterDeletionName}\"?`
          : `Delete query parameter?`
        }
        message="Are you sure you want to delete the query parameter?"
        confirmTitle="Delete"
        onConfirm={this.deleteQueryParameterPromptConfirm}
        onCancel={this.deleteQueryParameterPromptCancel}
        destructiveConfirm />
      </div>
    )
  }
}

EditRequestTab.propTypes = {
  detailsTabIndex: PropTypes.number.isRequired,
  onDetailsTabIndexChange: PropTypes.func.isRequired,
  body: PropTypes.string,
  headers: PropTypes.array.isRequired,
  queryParameters: PropTypes.array.isRequired,
  onHeaderNameChange: PropTypes.func.isRequired,
  onHeaderValueChange: PropTypes.func.isRequired,
  onDeleteHeaderClick: PropTypes.func.isRequired,
  onAddHeaderClick: PropTypes.func.isRequired,
  onQueryParameterNameChange: PropTypes.func.isRequired,
  onQueryParameterValueChange: PropTypes.func.isRequired,
  onDeleteQueryParameterClick: PropTypes.func.isRequired,
  onAddQueryParameterClick: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired
}

EditRequestTab.defaultProps = {
  headers: {},
  queryParameters: {}
}

export default withStyles(styles)(EditRequestTab)
