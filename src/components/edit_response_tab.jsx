import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 12, paddingLeft: 24, paddingRight: 24 }}>
      {props.children}
    </Typography>
  )
}

class EditResponseTab extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
        <div style={{ flex: '0 1 auto' }}>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs value={0} centered>
              <Tab label="Headers" />
            </Tabs>
          </AppBar>
          <TabContainer>Headers</TabContainer>
        </div>
        <div style={{ padding: 12, paddingLeft: 24, paddingRight: 24, flex: '1 1 auto' }}>
          Fill rest
        </div>
      </div>
    )
  }
}

EditResponseTab.propTypes = {}

export default EditResponseTab