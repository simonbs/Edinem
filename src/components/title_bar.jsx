import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

const styles = {
  menuButton: {
    marginLeft: -22
  },
  title: {
    marginLeft: 8
  }
}

class TitleBar extends React.Component {
  render() {
    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton 
          onClick={this.props.onMenuClick} 
          className={this.props.classes.menuButton} 
          color="contrast">
            <Badge badgeContent={10} color="accent">
              <MenuIcon/>
            </Badge>
          </IconButton>
          <Typography type="title" color="inherit" className={this.props.classes.title}>
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