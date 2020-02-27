import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { deleteClassroom } from "../../actions/classroom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 800,
    padding: 0
  },
  nested: {
    paddingLeft: theme.spacing(4),
    background: "rgb(23, 162, 184)",
    color: "black"
  }
}));

const ListDropDown = ({ classroom, deleteClassroom, daycare: { daycare } }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const deleteClass = class_id => {
    deleteClassroom(daycare._id, class_id);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      key={classroom._id}
    >
      <ListItem button onClick={handleClick}>
        <i className="fa fa-users mr-1 text-primary"></i>
        <ListItemText
          primary={classroom.name}
          secondary={`students: ${classroom.students.length}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon onClick={e => deleteClass(classroom._id)} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {classroom.students.map(student => {
            return (
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemSecondaryAction>
                  <IconButton edge="start" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemText
                  primary={`${student.firstname} ${student.lastname}`}
                />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

ListDropDown.propTypes = {
  deleteClassroom: PropTypes.func.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  daycare: state.daycare
});

export default connect(mapStateToProps, { deleteClassroom })(ListDropDown);
