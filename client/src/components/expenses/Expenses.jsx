import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import { getUserDaycares } from "../../actions/daycare";
import { getClassroomById, deleteClassroom } from "../../actions/classroom";
import { getStudentsByDaycare } from "../../actions/classroom";
import DashboardActions from "../dashboard/DashboardActions";
import DataTable from "../table/DataTable";

const Expenses = ({
  classroom: { classrooms },
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
      <h1 className="header">Expenses</h1>
      <DashboardActions />
      <Container maxWidth="lg">
        <DataTable students={students} />
      </Container>
    </Fragment>
  );
};

Expenses.propTypes = {
  getClassroomById: PropTypes.func.isRequired,
  getUserDaycares: PropTypes.func.isRequired,
  getStudentsByDaycare: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student,
  classroom: state.classroom,
  daycare: state.daycare
});

export default connect(mapStateToProps, {
  getClassroomById,
  deleteClassroom,
  getUserDaycares,
  getStudentsByDaycare
})(Expenses);
