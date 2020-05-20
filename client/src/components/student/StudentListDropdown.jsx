import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CurrencyFormat from "react-currency-format";
import EditIcon from "@material-ui/icons/Edit";

import { deleteStudent } from "../../actions/classroom";

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

const StudentListDropdown = ({
  student,
  deleteStudent,
  daycare: { daycare }
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const deleteStu = (e, class_id, student_id) => {
    e.preventDefault();
    deleteStudent(daycare._id, class_id, student_id);
  };

  const editStudent = (e, class_id, student_id) => {
    e.preventDefault();
    deleteStudent(daycare._id, class_id, student_id);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Fragment>
        <ListItem button onClick={handleClick}>
          <i class="fa fa-child mr-1"></i>
          <ListItemText primary={`${student.firstname} ${student.lastname}`} />
          {open ? <ExpandLess /> : <ExpandMore />}
          <ListItemSecondaryAction>
            <IconButton
              onClick={e => deleteStu(e, student.classroom, student._id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton edge="end" aria-label="edit">
              <Link to={`/student/${student._id}`}>
                <EditIcon />
              </Link>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem id="listitem-custom" className={classes.nested}>
              <ListItemText primary={`Classroom: ${student.classroomname}`} />
            </ListItem>
            <ListItem id="listitem-custom" className={classes.nested}>
              <ListItemText
                primary={`Dixon Tuition: ${formatter.format(
                  student.dixontuition
                )}`}
              />
            </ListItem>
            <ListItem id="listitem-custom" className={classes.nested}>
              <ListItemText
                primary={`Dixon Overage Charge: ${formatter.format(
                  student.dixonoveragecharge
                )}`}
              />
            </ListItem>
            <ListItem id="listitem-custom" className={classes.nested}>
              <ListItemText
                primary={`Parent Fee: ${formatter.format(student.parentfee)}`}
              />
            </ListItem>
            <ListItem id="listitem-custom" className={classes.nested}>
              <ListItemText
                primary={`Subsidy Payment: ${formatter.format(
                  student.subsidypayment
                )}`}
              />
            </ListItem>
            <ListItem id="listitem-custom" className={classes.nested}>
              <ListItemText
                primary={`Total: ${formatter.format(student.total)}`}
              />
            </ListItem>
            <ListItem id="listitem-custom" className={classes.nested}>
              <ListItemText
                primary={`
              Difference: ${formatter.format(student.difference)}`}
              />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    </List>
  );
};

StudentListDropdown.propTypes = {
  deleteStudent: PropTypes.func.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  daycare: state.daycare
});

export default connect(mapStateToProps, { deleteStudent })(StudentListDropdown);
