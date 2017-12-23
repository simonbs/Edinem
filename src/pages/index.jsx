import React from 'react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

class Index extends React.Component {
  render() {
    return (
      <div>
        <Typography type="display1" gutterBottom>
          Testing testing
        </Typography>
        <Button raised color="primary" onClick={this.handleClick}>
          Super Secret Password
        </Button>
      </div>
    )
  }
}

export default Index
