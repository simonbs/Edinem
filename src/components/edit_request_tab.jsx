import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 12, paddingLeft: 24, paddingRight: 24 }}>
      {props.children}
    </Typography>
  )
}

class EditRequestTab extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
        <div style={{ flex: '0 1 auto' }}>
          <div style={{ padding: 12, paddingLeft: 24, paddingRight: 24 }}>
            <TextField label="URL" placeholder="URL" fullWidth />
          </div>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs value={this.props.detailsTabIndex} onChange={this.props.onDetailsTabIndexChange} centered>
              <Tab label="Headers" />
              <Tab label="Query" />
            </Tabs>
          </AppBar>
          {this.props.detailsTabIndex === 0 && <TabContainer>Headers</TabContainer>}
          {this.props.detailsTabIndex === 1 && <TabContainer>Query</TabContainer>}
        </div>
        <div style={{ padding: 12, paddingLeft: 24, paddingRight: 24, flex: '1 1 auto' }}>
          Fill rest
        </div>
      </div>
    )
  }
}

EditRequestTab.propTypes = {
  detailsTabIndex: PropTypes.number.isRequired,
  onDetailsTabIndexChange: PropTypes.func.isRequired
}

export default EditRequestTab
