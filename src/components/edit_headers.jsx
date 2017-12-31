import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

const styles = {
  deleteCell: {
    width: '40px'
  }
}

class EditHeaders extends React.Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell className={this.props.classes.deleteCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.headers.map((header, idx) => (
            <TableRow key={`row-${idx}`}>
              <TableCell>{header.name}</TableCell>
              <TableCell>{header.value}</TableCell>
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

EditHeaders.propTypes = {
  headers: PropTypes.array.isRequired
}

export default withStyles(styles)(EditHeaders)
