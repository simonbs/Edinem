import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/Menu'
import MenuIcon from 'material-ui-icons/Menu'
import TransactionsDrawer from '../containers/transactions_drawer'
import Typography from 'material-ui/Typography'

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
  topBar: {
    display: 'flex',
    paddingTop: 12,
    paddingBottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: theme.palette.primary[500]
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
})

class TransactionUnavailablePage extends React.Component {
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
        </div>
        <div className={this.props.classes.contentWrapper}>
          <Typography>
            No request and response selected.
          </Typography>
        </div>
      </div>
    )
  }
}

TransactionUnavailablePage.propTypes = {
  onMenuClick: PropTypes.func.isRequired
}

export default withStyles(styles)(TransactionUnavailablePage)
