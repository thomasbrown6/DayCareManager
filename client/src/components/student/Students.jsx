import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Container from "@material-ui/core/Container";
import { getUserDaycareDetails } from "../../actions/daycare";
import { getClassroomById, deleteClassroom } from "../../actions/classroom";
import { deleteStudent } from "../../actions/classroom";
import { getStudentsByDaycare } from "../../actions/classroom";
import { getClassroomsByDaycare } from "../../actions/classroom";
import AddStudent from "./AddStudent";
import StudentListDropdown from "./StudentListDropdown";
import DashboardActions from "../dashboard/DashboardActions";
import Copyright from "../layout/Copyright";

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

const Students = ({
  student: { students, loaded },
  getUserDaycareDetails,
  deleteStudent,
  getStudentsByDaycare,
  getClassroomsByDaycare,
  daycare: { daycare },
  classroom
}) => {
  useEffect(() => {
    getUserDaycareDetails();
  }, [getUserDaycareDetails]);

  if (
    (daycare != null && Array.isArray(students) && !loaded) ||
    (daycare != null && !classroom.loaded)
  ) {
    getStudentsByDaycare(daycare._id);
    getClassroomsByDaycare(daycare._id);
  }

  return (
    <Fragment>
      <h1 className="header">Students</h1>
      <DashboardActions />
      {!Array.isArray(students) ? (
        <h2>No classrooms, use the form to add classrooms</h2>
      ) : (
        ""
      )}
      <div className="w-100 wrapper">
        <Container className="ft-l" maxWidth="sm">
          <div>
            <List component="nav" aria-labelledby="nested-list-subheader">
              {Array.isArray(students) &&
                students.map((student, index) => {
                  if (index < 30) {
                    return <StudentListDropdown student={student} />;
                  }
                })}
            </List>
          </div>
        </Container>
        <AddStudent
          daycare={daycare}
          classrooms={classroom.classrooms}
          error={classroom.error}
        />
      </div>
    </Fragment>
  );
};

Students.propTypes = {
  getClassroomById: PropTypes.func.isRequired,
  getUserDaycareDetails: PropTypes.func.isRequired,
  getStudentsByDaycare: PropTypes.func.isRequired,
  getClassroomsByDaycare: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student,
  daycare: state.daycare,
  classroom: state.classroom
});

export default connect(mapStateToProps, {
  getClassroomById,
  deleteClassroom,
  deleteStudent,
  getUserDaycareDetails,
  getClassroomsByDaycare,
  getStudentsByDaycare
})(Students);
