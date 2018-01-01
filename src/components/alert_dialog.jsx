import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { red } from 'material-ui/colors'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

const styles = {
  destructiveButton: {
    color: red[500]
  }
}

class AlertDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onCancel}>
        {this.props.title != null &&
          <DialogTitle>{this.props.title}</DialogTitle>
        }
        <DialogContent>
          <DialogContentText>
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {this.props.destructiveConfirm ? (
            <Button
            onClick={this.props.onConfirm}
            color="primary"
            className={this.props.classes.destructiveButton}>
              {this.props.confirmTitle}
            </Button>
          ) : (
              <Button onClick={this.props.onConfirm} color="primary">
                {this.props.confirmTitle}
              </Button>
          )}
          <Button onClick={this.props.onCancel} color="primary" autoFocus>
            {this.props.cancelTitle}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  confirmTitle: PropTypes.string.isRequired,
  cancelTitle: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  destructiveConfirm: PropTypes.bool.isRequired
}

AlertDialog.defaultProps = {
  confirmTitle: "OK",
  cancelTitle: "Cancel",
  destructiveConfirm: false
}

export default withStyles(styles)(AlertDialog)