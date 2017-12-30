import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
}

class LoadingPage extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <CircularProgress />
      </div>
    )
  }
}

export default withStyles(styles)(LoadingPage)
