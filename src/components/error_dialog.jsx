import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

class ErrorDialog extends React.Component {  
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.text}  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ErrorDialog.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

ErrorDialog.defaultProps = {
  open: true
}

export default withStyles()(ErrorDialog)