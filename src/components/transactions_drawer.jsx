import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import DoneIcon from 'material-ui-icons/Done'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import AlertDialog from './alert_dialog'

const styles = (theme) => ({
  list: {
    maxHeight: '600px'
  },
  transactionCount: {
    backgroundColor: theme.palette.primary[500]
  },
  headerText: {
    fontWeight: 'bold'
  }
})

class TransactionsDrawer extends React.Component {
  state = {
    transactionDeletionTransactionGroupId: null,
    transactionDeletionIndex: null,
    transactionDeletionMethod: null,
    transactionDeletionPath: null
  }

  promptDeleteTransaction = (transactionGroupId, transactionIndex, method, name) => {
    this.setState({
      ...this.state,
      transactionDeletionTransactionGroupId: transactionGroupId,
      transactionDeletionIndex: transactionIndex,
      transactionDeletionMethod: method,
      transactionDeletionPath: name
    })
  }

  deleteTransactionPromptConfirm = () => {
    this.props.onDeleteTransactionClick(
      this.state.transactionDeletionTransactionGroupId,
      this.state.transactionDeletionIndex)
    this.setState({
      ...this.state,
      transactionDeletionIndex: null
    })
  }

  deleteTransactionPromptCancel = () => {
    this.setState({
      ...this.state,
      transactionDeletionIndex: null
    })
  }

  isTransactionGroupExpanded(transactionGroupId) {
    return this.props.expandedTransactionGroupIds.includes(transactionGroupId)
  }

  toggleTransactionGroup(transactionGroupId) {
    this.props.onClickHeader(transactionGroupId)
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <Drawer
          anchor="top"
          open={this.props.open}
          onClose={this.props.onClose}>
          <List className={this.props.classes.list}>
            {this.props.session.transactionGroups.map(transactionGroup => (
              <div key={`section-${transactionGroup.id}`}>
                <ListItem button onClick={() => { this.toggleTransactionGroup(transactionGroup.id) }}>
                  <Avatar className={this.props.classes.transactionCount}>
                    {transactionGroup.transactions.length}
                  </Avatar>
                  <ListItemText
                    primary={transactionGroup.name}
                    classes={{
                      text: this.props.classes.headerText
                    }} />
                  {this.isTransactionGroupExpanded(transactionGroup.id) ? <ExpandLess /> : <ExpandMore />}
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
                        key={`item-${transactionGroup.id}-${transaction.id}}`}>
                        {this.props.selectedTransactionGroupId == transactionGroup.id &&
                          this.props.selectedTransactionIndex == idx &&
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
                            transactionGroup.id,
                            idx,
                            transaction.method,
                            transaction.path
                          )}>
                            <DeleteIcon/>
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
        <AlertDialog
          open={this.state.transactionDeletionTransactionGroupId != null &&
                this.state.transactionDeletionIndex != null}
          title={`Delete \"${this.state.transactionDeletionMethod} ${this.state.transactionDeletionPath}\"?`}
          message="Are you sure you want to delete the request and response?"
          confirmTitle="Delete"
          onConfirm={this.deleteTransactionPromptConfirm}
          onCancel={this.deleteTransactionPromptCancel}
          destructiveConfirm />
      </div>
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
    return `${transaction.method} ${transaction.path}${query}`
  }
}

TransactionsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
  expandedTransactionGroupIds: PropTypes.array.isRequired,
  selectedTransactionGroupId: PropTypes.string,
  selectedTransactionIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onClickHeader: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
  onDeleteTransactionClick: PropTypes.func.isRequired
}

export default withStyles(styles)(TransactionsDrawer)