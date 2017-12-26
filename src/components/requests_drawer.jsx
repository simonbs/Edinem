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

class RequestsDrawer extends React.Component {
  render() {
    return (
      <Drawer
        anchor="top"
        open={this.props.open}
        onClose={this.props.onClose}>
        <List className={this.props.classes.list}>
          {[0, 1, 2, 3, 4].map(sectionId => (
            <div key={`section-${sectionId}`}>
              <ListSubheader className={this.props.classes.subheader}>
                nordiskfilmapp.dk
              </ListSubheader>
              {[0, 1, 2, 3, 4].map(item => (
                <ListItem button key={`item-${sectionId}-${item}`}>
                  {sectionId == 0 && item == 1 &&
                    <ListItemIcon>
                      <DoneIcon />
                    </ListItemIcon>
                  }
                  <ListItemText inset primary="GET /movies" />
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

RequestsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(RequestsDrawer)