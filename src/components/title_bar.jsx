import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

const styles = {
  menuButton: {
    marginLeft: '-22px'
  }
}

class TitleBar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton 
          onClick={this.props.onMenuClick} 
          className={classes.menuButton} 
          color="contrast"
          className={this.props.classes.menuButton}>
            <MenuIcon/>
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired
}

export default withStyles(styles)(TitleBar)