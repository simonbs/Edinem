import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { green } from 'material-ui/colors'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import DoneIcon from 'material-ui-icons/Done'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import AlertDialog from './alert_dialog'

const styles = (theme) => ({
  list: {
    maxHeight: '600px'
  },
  add: {
    backgroundColor: green[500]
  },
  transactionCount: {
    backgroundColor: theme.palette.primary[500]
  }
})

class TransactionsDrawer extends React.Component {
  state = {
    transactionDeletionId: null,
    transactionDeletionMethod: null,
    transactionDeletionPath: null
  }

  promptDeleteTransaction = (transactionId, method, name) => {
    this.setState({
      ...this.state,
      transactionDeletionId: transactionId,
      transactionDeletionMethod: method,
      transactionDeletionPath: name
    })
  }

  deleteTransactionPromptConfirm = () => {
    this.props.onDeleteTransaction(this.state.transactionDeletionId)
    this.setState({
      ...this.state,
      transactionDeletionId: null
    })
  }

  deleteTransactionPromptCancel = () => {
    this.setState({
      ...this.state,
      transactionDeletionId: null
    })
  }

  isTransactionGroupExpanded(transactionGroupId) {
    return this.props.expandedTransactionGroupIds.includes(transactionGroupId)
  }

  toggleTransactionGroup(transactionGroupId) {
    if (this.isTransactionGroupExpanded(transactionGroupId)) {
      this.props.onCollapseTransactionGroup(transactionGroupId)
    } else {
      this.props.onExpandTransactionGroup(transactionGroupId)
    }
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <Drawer
          anchor="top"
          open={this.props.open}
          onClose={this.props.onClose}>          
          {this.renderList()}
        </Drawer>
        {this.renderDeleteDialog()}
      </div>
    )
  }

  renderList() {
    return (
      <List className={this.props.classes.list}>
        {this.renderAddListItem()}
        {this.props.session.transactionGroups.map(transactionGroup => (
          <div key={`section-${transactionGroup.id}`}>
            {this.renderHeaderListItem(transactionGroup)}
            <Collapse
              component="li"
              in={this.isTransactionGroupExpanded(transactionGroup.id)}
              timeout="auto"
              unmountOnExit>
              <List disablePadding>
                {transactionGroup.transactions.map((transaction, idx) => 
                  this.renderTransactionListItem(transactionGroup, transaction, idx)
                )}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    )
  }

  renderAddListItem() {
    return (
      <ListItem button onClick={this.props.onAddTransaction}>
        <Avatar className={this.props.classes.add}>
          <AddIcon/>
        </Avatar>
        <ListItemText primary="Add request and response" />
      </ListItem>
    )  
  }

  renderHeaderListItem(transactionGroup) {
    return (
      <ListItem button onClick={() => this.toggleTransactionGroup(transactionGroup.id)}>
        <Avatar className={this.props.classes.transactionCount}>
          {transactionGroup.transactions.length}
        </Avatar>
        <ListItemText primary={transactionGroup.name} />
        {this.isTransactionGroupExpanded(transactionGroup.id) ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
    )
  }

  renderTransactionListItem(transactionGroup, transaction) {
    return (
      <ListItem
        button
        onClick={() => { this.props.onSelectTransaction(transaction.id) }}
        key={`item-${transactionGroup.id}-${transaction.id}}`}>
        {this.props.selectedTransactionId == transaction.id &&
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
        }
        <ListItemText
          inset
          primary={this.primaryText(transaction)}
          secondary={transactionGroup.name} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.promptDeleteTransaction(
            transaction.id,
            transaction.method,
            transaction.path
          )}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  renderDeleteDialog() {
    return (
      <AlertDialog
        open={this.state.transactionDeletionId != null}
        title={`Delete \"${this.state.transactionDeletionMethod} ${this.state.transactionDeletionPath}\"?`}
        message="Are you sure you want to delete the request and response?"
        confirmTitle="Delete"
        onConfirm={this.deleteTransactionPromptConfirm}
        onCancel={this.deleteTransactionPromptCancel}
        destructiveConfirm />
    )
  }

  primaryText(transaction) {
    let queryParameters = transaction.request.validQueryParameters()
    let query = ''
    if (queryParameters.length > 0) {
      query += '?'
      query += queryParameters.map(queryParameter => {
        let value = (queryParameter.value) ? queryParameter.value : ''
        return queryParameter.name + "=" + value
      }).join('&')
    }
    return `${transaction.method} ${transaction.path}${query} (${transaction.response.statusCode})`
  }
}

TransactionsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
  expandedTransactionGroupIds: PropTypes.array.isRequired,
  selectedTransactionId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onExpandTransactionGroup: PropTypes.func.isRequired,
  onCollapseTransactionGroup: PropTypes.func.isRequired,
  onSelectTransaction: PropTypes.func.isRequired,
  onAddTransaction: PropTypes.func.isRequired,
  onDeleteTransaction: PropTypes.func.isRequired
}

export default withStyles(styles)(TransactionsDrawer)