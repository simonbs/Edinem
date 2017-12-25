import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ paddingLeft: 8 * 3, paddingRight: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

class EditRequestTab extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} style={{ paddingLeft: 8 * 3, paddingRight: 8 * 3 }}>
          <TextField label="URL" placeholder="URL" fullWidth />
        </Grid>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs value={this.props.detailsTabIndex} onChange={this.props.onDetailsTabIndexChange} centered>
            <Tab label="Headers" />
            <Tab label="Query" />
          </Tabs>
        </AppBar>
        {this.props.detailsTabIndex === 0 && <TabContainer>Headers</TabContainer>}
        {this.props.detailsTabIndex === 1 && <TabContainer>Query</TabContainer>}
      </Grid>
    )
  }
}

EditRequestTab.propTypes = {
  detailsTabIndex: PropTypes.number.isRequired,
  onDetailsTabIndexChange: PropTypes.func.isRequired
}

export default EditRequestTab
