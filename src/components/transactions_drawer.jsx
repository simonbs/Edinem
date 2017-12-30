import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DoneIcon from 'material-ui-icons/Done'
import DeleteIcon from 'material-ui-icons/Delete'

const styles = {
  list: {
    maxHeight: '600px'
  },
  subheader: {
    backgroundColor: 'white'
  }
}

class TransactionsDrawer extends React.Component {
  render() {
    return (
      <Drawer
        anchor="top"
        open={this.props.open}
        onClose={this.props.onClose}>
        <List className={this.props.classes.list}>
          {this.props.session.transactionGroups.map(transactionGroup => (
            <div key={`section-${transactionGroup.id}`}>
              <ListSubheader className={this.props.classes.subheader}>
                {transactionGroup.name}
              </ListSubheader>
              {transactionGroup.transactions.map((transaction, idx) => (
                <ListItem
                button
                onClick={() => {this.props.onSelect(transactionGroup.id, idx)}}
                key={`item-${transactionGroup.id}-${idx}`}>
                  {this.props.selectedTransactionGroupId == transactionGroup.id &&
                   this.props.selectedTransactionIndex == idx &&
                    <ListItemIcon>
                      <DoneIcon />
                    </ListItemIcon>
                  }
                  <ListItemText inset primary={`${transaction.method} ${transaction.path}`} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Drawer>
    )
  }
}

TransactionsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  selectedTransactionGroupId: PropTypes.string.isRequired,
  selectedTransactionIndex: PropTypes.number.isRequired
}

export default withStyles(styles)(TransactionsDrawer)