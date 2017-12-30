import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import FolderOpen from 'material-ui-icons/FolderOpen'

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
})

class OpenSessionPage extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <Button
        className={this.props.classes.button}
        color="primary"
        raised
        dense 
        onClick={this.props.onOpenSessionClick}>
          <FolderOpen className={this.props.classes.leftIcon} />
          Open File
        </Button>
      </div>
    )
  }
}

OpenSessionPage.propTypes = {
  onOpenSessionClick: PropTypes.func.isRequired
}

export default withStyles(styles)(OpenSessionPage)
