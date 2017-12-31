import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

const styles = {
  headerCell: {
    fontSize: '11pt'
  },
  deleteCell: {
    width: '40px'
  },
  input: {
    fontSize: '11pt'
  }
}

class EditKeyValuePairs extends React.Component {
  render() {
    return (
      <Table>
        <TableBody>
          {Object.keys(this.props.pairs).map((key, idx) => (
            <TableRow key={`row-${idx}`}>
              <TableCell>
                <TextField
                  placeholder="Name"
                  value={key}
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: this.props.classes.input
                    }
                  }} />
              </TableCell>
              <TableCell>
                <TextField
                  placeholder="Value"
                  value={this.props.pairs[key]}
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: this.props.classes.input
                    }
                  }} />
              </TableCell>
              <TableCell className={this.props.classes.deleteCell}>
                <IconButton color="default">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

EditKeyValuePairs.propTypes = {
  pairs: PropTypes.object.isRequired
}

export default withStyles(styles)(EditKeyValuePairs)
