import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { green } from 'material-ui/colors'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete'
import AddIcon from 'material-ui-icons/Add'

const styles = {
  deleteCell: {
    width: '40px'
  },
  input: {
    fontSize: '11pt'
  },
  addButton: {
    color: 'white',
    backgroundColor: green[500]
  },
  addContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
}

class EditKeyValuePairs extends React.Component {
  render() {
    return (
      <div>
        <Table>
          <TableBody>
            {this.props.pairs.map((pair, idx) => (
              <TableRow key={`row-${pair.id}`}>
                <TableCell>
                  <TextField
                    placeholder="Name"
                    defaultValue={pair.key}
                    onChange={(e) => { this.props.onKeyChange(idx, e.target.value) }}
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
                    defaultValue={pair.value}
                    onChange={(e) => { this.props.onValueChange(idx, e.target.value) }}
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      classes: {
                        input: this.props.classes.input
                      }
                    }} />
                </TableCell>
                <TableCell className={this.props.classes.deleteCell}>
                  <IconButton
                    color="default"
                    onClick={() => { this.props.onDeleteClick(idx) }}
                    tabIndex="-1">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={this.props.classes.addContainer}>
          <Button
            onClick={this.props.onAddClick}
            className={this.props.classes.addButton}
            tabIndex="-1">
            <AddIcon />
            {this.props.addTitle}
          </Button>
        </div>
      </div>
    )
  }
}

EditKeyValuePairs.propTypes = {
  pairs: PropTypes.array.isRequired,
  addTitle: PropTypes.string.isRequired,
  onKeyChange: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
}

export default withStyles(styles)(EditKeyValuePairs)
