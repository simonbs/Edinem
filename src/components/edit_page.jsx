import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel } from 'material-ui/Input'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import MenuIcon from 'material-ui-icons/Menu'
import TransactionsDrawer from '../containers/transactions_drawer'
import EditRequestTab from '../containers/edit_request_tab'
import EditResponseTab from '../containers/edit_response_tab'

const styles = (theme) => ({
  menuButton: {
    marginLeft: -22,
    top: -5
  },
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
  },
  topBar: {
    display: 'flex',
    paddingTop: 12,
    paddingBottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: theme.palette.primary[500]
  },
  methodURLAndStatusCodeContainer: {
    display: 'flex',
    flexGrow: 1
  },
  methodSelect: {
    color: 'white',
    fontSize: '18pt',
    marginLeft: 20
  },
  methodSelectIcon: {
    color: 'white',
    top: 6
  },
  urlInputContainer: {
    display: 'flex',
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 40
  },  
  urlInput: {
    color: 'white',
    fontSize: '18pt'
  },
  statusCodeLabel: {
    color: 'white'
  },
  statusCodeInput: {
    color: 'white',
    width: '40px'
  },
  requestAndResponseContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100%'
  }
})

const methods = ["GET", "POST", "PUT", "DELETE", "HEAD", "CONNECT", "OPTIONS", "TRACE", "PATCH"]

class EditPage extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <TransactionsDrawer />
        <div className={this.props.classes.topBar}>
          <IconButton
            onClick={this.props.onMenuClick}
            className={this.props.classes.menuButton}
            color="contrast"
            tabIndex="-1">
            <MenuIcon />
          </IconButton>
          {this.renderMethodURLAndStatusCode()}
        </div>
        {this.renderRequestAndResponse()}
      </div>
    )
  }

  renderMethodURLAndStatusCode() {
    return (
      <div
      key={this.props.transactionId}
      className={this.props.classes.methodURLAndStatusCodeContainer}>
        <InputLabel htmlFor="method"></InputLabel>
        <Select
          value={this.props.method}
          onChange={(event) => this.props.onMethodChange(event.target.value)}
          input={<Input name="method" id="method" />}
          disableUnderline
          className={this.props.classes.methodSelect}
          classes={{
            icon: this.props.classes.methodSelectIcon
          }}>
          {methods.map(method => (
            <MenuItem key={method} value={method}>{method}</MenuItem>
          ))}
        </Select>
        <div className={this.props.classes.urlInputContainer}>
          <TextField
            placeholder="URL"
            defaultValue={this.props.url}
            fullWidth            
            InputProps={{
              disableUnderline: true,
              classes: {
                input: this.props.classes.urlInput
              }
            }} />
        </div>
        <div className={this.props.classes.statusCodeContainer}>
          <TextField
            label="Status"
            placeholder="200"
            defaultValue={this.props.statusCode}
            labelClassName={this.props.classes.statusCodeLabel}
            onChange={(e) => this.props.onStatusCodeChange(e.target.value)}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: this.props.classes.statusCodeInput
              }
            }} />
        </div>
      </div>
    )
  }

  renderRequestAndResponse() {
    return (
      <div className={this.props.classes.requestAndResponseContainer}>
        <div className={this.props.classes.fixedHeight}>
          <AppBar position="static" elevation={0}>
            <Tabs
              value={this.props.requestResponseTabIndex}
              onChange={this.props.onRequestResponseTabIndexChange}
              centered>
              <Tab label="Request" tabIndex="-1" />
              <Tab label="Response" tabIndex="-1" />
            </Tabs>
          </AppBar>
        </div>
        <div className={this.props.classes.dynamicHeight}>
          {this.props.requestResponseTabIndex === 0 && <EditRequestTab />}
          {this.props.requestResponseTabIndex === 1 && <EditResponseTab />}
        </div>
      </div>
    )
  }
}

EditPage.propTypes = {
  transactionId: PropTypes.string.isRequired,
  requestResponseTabIndex: PropTypes.number.isRequired,
  method: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  statusCode: PropTypes.string.isRequired,
  onRequestResponseTabIndexChange: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onMethodChange: PropTypes.func.isRequired,
  onStatusCodeChange: PropTypes.func.isRequired
}

export default withStyles(styles)(EditPage)
