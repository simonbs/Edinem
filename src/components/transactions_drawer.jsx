import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import DoneIcon from 'material-ui-icons/Done'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

const styles = {
  list: {
    maxHeight: '600px'
  },
  subheader: {
    backgroundColor: 'white'
  },
  subheaderText: {
    fontWeight: 'bold'
  }
}

class TransactionsDrawer extends React.Component {
  state = {
    expandedTransactionGroupIds: []
  }
  
  isTransactionGroupExpanded(transactionGroupId) {
    return this.state.expandedTransactionGroupIds.includes(transactionGroupId)
  }

  toggleTransactionGroup(transactionGroupId) {
    const expandedTransactionGroupIds = this.state.expandedTransactionGroupIds
    const idx = expandedTransactionGroupIds.indexOf(transactionGroupId)
    if (idx == -1) {
      expandedTransactionGroupIds.push(transactionGroupId)
    } else {
      expandedTransactionGroupIds.splice(idx, 1)
    }      
    this.setState({
      ...this.state,
      expandedTransactionGroupIds: expandedTransactionGroupIds
    })
  }

  render() {
    return (
      <Drawer
        anchor="top"
        open={this.props.open}
        onClose={this.props.onClose}>
        <List className={this.props.classes.list}>
          {this.props.session.transactionGroups.map(transactionGroup => (
            <div key={`section-${transactionGroup.id}`}>
              <ListItem button onClick={() => { this.toggleTransactionGroup(transactionGroup.id) }}>
                <ListItemText
                  primary={transactionGroup.name}                  
                  classes={{
                    text: this.props.classes.subheaderText
                  }} />
                { this.isTransactionGroupExpanded(transactionGroup.id) ? <ExpandLess/> : <ExpandMore/> }
              </ListItem>
              <Collapse
              component="li"
              in={this.isTransactionGroupExpanded(transactionGroup.id)}
              timeout="auto"
              unmountOnExit>
                <List disablePadding>
                  {transactionGroup.transactions.map((transaction, idx) => (
                    <ListItem
                      button
                      onClick={() => { this.props.onClickItem(transactionGroup.id, idx) }}
                      key={`item-${transactionGroup.id}-${idx}`}>
                      <ListItemText
                        inset
                        primary={`${transaction.method} ${transaction.path}`}
                        secondary={transactionGroup.name} />
                      {this.props.selectedTransactionGroupId == transactionGroup.id &&
                        this.props.selectedTransactionIndex == idx &&
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                      }
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
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
  onClickHeader: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,  
  session: PropTypes.object.isRequired,
  selectedTransactionGroupId: PropTypes.string.isRequired,
  selectedTransactionIndex: PropTypes.number.isRequired,  
}

export default withStyles(styles)(TransactionsDrawer)