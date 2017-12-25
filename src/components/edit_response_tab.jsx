import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ paddingLeft: 8 * 3, paddingRight: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

class EditResponseTab extends React.Component {
  constructor(props) {
    super(props)
    this.detailsTabIndex = 0
  }

  render() {
    return (
      <Grid container>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs value={0} centered>
            <Tab label="Headers" />
          </Tabs>
        </AppBar>
        <TabContainer>Headers</TabContainer>
      </Grid>
    )
  }
}

EditResponseTab.propTypes = {}

export default EditResponseTab