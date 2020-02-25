import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import { getUserDaycares } from "../../actions/daycare";
import { getClassroomById, deleteClassroom } from "../../actions/classroom";
import { getStudentsByDaycare } from "../../actions/classroom";
import ListDropDown from "../../components/table/ListDropDown";
import AddStudent from "./AddStudent";
import DashboardActions from "../dashboard/DashboardActions";
import DataTable from "../table/DataTable";

const Students = ({
  student: { students, loaded },
  getUserDaycares,
  getStudentsByDaycare,
  daycare: { daycare }
}) => {
  useEffect(() => {
    getUserDaycares();
  }, [getUserDaycares]);

  if (daycare != null && Array.isArray(students) && !loaded) {
    getStudentsByDaycare(daycare._id);
  }
  return (
    <Fragment>
      <h1 className="header">Students</h1>
      <DashboardActions />
      <div className="w-100 wrapper">
        <Container className="ft-l" maxWidth="sm">
          <div>
            <List component="nav">
              {students.map(student => {
                return (
                  <ListItem button>
                    <ListItemText
                      primary={`${student.lastname}, ${student.firstname}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Container>
        <AddStudent />
      </div>
    </Fragment>
  );
};

Students.propTypes = {
  getClassroomById: PropTypes.func.isRequired,
  getUserDaycares: PropTypes.func.isRequired,
  getStudentsByDaycare: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student,
  daycare: state.daycare
});

export default connect(mapStateToProps, {
  getClassroomById,
  deleteClassroom,
  getUserDaycares,
  getStudentsByDaycare
})(Students);
