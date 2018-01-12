import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import brace from 'brace'
import AceEditor from 'react-ace'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import 'brace/mode/plain_text'
import 'brace/mode/json'
import 'brace/mode/xml'
import 'brace/theme/tomorrow'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'red'
  },
  tabsContainer: {
    display: 'flex',
    alignSelf: 'flex-end',
    width: '100%'
  }
}

class Editor extends React.Component {
  componentDidUpdate(prevProps) {
    const { error, active } = this.props
    const prevError = prevProps.error
    const prevActive = prevProps.active
    if (error !== prevError || active !== prevActive) {
      window.dispatchEvent(new Event('resize'))
    }
  }

  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <AceEditor
          mode={this.editorModeForTabIndex(this.props.contentTypeTabIndex)}
          theme="tomorrow"
          showPrintMargin={false}
          tabSize={2}
          fontSize='11pt'
          style={{ width: 'auto', height: 'auto', flex: 1 }}
          value={this.props.value}
          onChange={this.props.onChange} />
        <div className={this.props.classes.tabsContainer}>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs
              value={this.props.contentTypeTabIndex}
              onChange={(event, idx) => this.props.onContentTypeTabIndexChange(idx)}
              centered>
              <Tab label="Plain Text" tabIndex="-1" />
              <Tab label="JSON" tabIndex="-1" />
              <Tab label="XML" tabIndex="-1" />
            </Tabs>
          </AppBar>
        </div>
      </div>
    )
  }

  editorModeForTabIndex(index) {
    switch (index) {
      case 1:
        return 'json'
      case 2:
        return 'xml'
      default:
        return 'plain_text'
    }
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  contentTypeTabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onContentTypeTabIndexChange: PropTypes.func.isRequired
}

export default withStyles(styles)(Editor)
