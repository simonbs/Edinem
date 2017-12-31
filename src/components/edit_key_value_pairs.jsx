import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete'
import AddIcon from 'material-ui-icons/Add'
import { green } from 'material-ui/colors'

const styles = {
  headerCell: {
    fontSize: '11pt'
  },
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
        <div className={this.props.classes.addContainer}>
          <Button onClick={this.props.onAddClick} className={this.props.classes.addButton}>
            <AddIcon />
            {this.props.addTitle}
          </Button>
        </div>
      </div>
    )
  }
}

EditKeyValuePairs.propTypes = {
  pairs: PropTypes.object.isRequired,
  addTitle: PropTypes.string.isRequired,
  onAddClick: PropTypes.func.isRequired
}

export default withStyles(styles)(EditKeyValuePairs)
