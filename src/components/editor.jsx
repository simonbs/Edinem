import React from 'react'
import PropTypes from 'prop-types'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/tomorrow'

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
      <AceEditor
        mode="json"
        theme="tomorrow"
        showPrintMargin={false}
        tabSize={2}
        fontSize='11pt'
        style={{ width: 'auto', height: 'auto', flex: 1 }}
        value={this.props.value}
        onChange={this.props.onChange} />
    )
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Editor
