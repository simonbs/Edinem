import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import EditKeyValuePairs from './edit_key_value_pairs'
import Editor from './editor'
import AlertDialog from './alert_dialog'

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
  bodySeparator: {
    height: 1,
    backgroundColor: grey[500]
  },
  bodyContainer: {
    padding: 0,
    display: 'flex',
    flex: '1 1 auto',
    backgroundColor: 'orange'
  }
}

class EditResponseTab extends React.Component {
  state = {
    headerDeletionIndex: null,
    headerDeletionName: null
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

  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs value={0} centered>
            <Tab label="Headers" tabIndex="-1" />
          </Tabs>
        </AppBar>
        <div className={this.props.classes.tabsContainer}>
          <EditKeyValuePairs
          pairs={this.props.headers}
          addTitle="Add header"
          onKeyChange={this.props.onHeaderNameChange}
          onValueChange={this.props.onHeaderValueChange}
          onDeleteClick={this.promptDeleteHeader}
          onAddClick={this.props.onAddHeaderClick} />
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
      </div>
    )
  }
}

EditResponseTab.propTypes = {
  body: PropTypes.string,
  headers: PropTypes.array.isRequired,
  onHeaderNameChange: PropTypes.func.isRequired,
  onHeaderValueChange: PropTypes.func.isRequired,
  onDeleteHeaderClick: PropTypes.func.isRequired,
  onAddHeaderClick: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired
}

EditResponseTab.defaultProps = {
  headers: {}
}

export default withStyles(styles)(EditResponseTab)