import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { CSVLink } from "react-csv";
import { getUserDaycareDetails } from "../../actions/daycare";
import { getClassroomById, deleteClassroom } from "../../actions/classroom";
import { getStudentsByDaycare } from "../../actions/classroom";
import DashboardActions from "../dashboard/DashboardActions";
import DataTable from "../table/DataTable";
import moment from "moment";

const Expenses = ({
  classroom: { classrooms },
  student: { students, loaded },
  getUserDaycareDetails,
  getStudentsByDaycare,
  daycare: { daycare }
}) => {
  useEffect(() => {
    getUserDaycareDetails();
  }, [getUserDaycareDetails]);

  if (daycare != null && Array.isArray(students) && !loaded) {
    getStudentsByDaycare(daycare._id);
  }

  let csvData = [
    [
      "Student Name",
      "Classroom",
      "Dixon Tuition",
      "Dixon Overage Charge",
      "Parent Fee",
      "Subsidy Payment",
      "Total",
      "Difference"
    ]
  ];
  if (students != null) {
    Array.isArray(students) &&
      students.map(student => {
        let studentobject = [
          `${student.firstname} ${student.lastname}`,
          student.classroomname,
          student.dixontuition.toString(),
          student.dixonoveragecharge.toString(),
          student.parentfee.toString(),
          student.subsidypayment.toString(),
          student.total.toString(),
          student.difference.toString()
        ];
        csvData.push(studentobject);
      });

    console.log(csvData);
  }

  return (
    <Fragment>
      <h1 className="header">Expenses</h1>
      <DashboardActions />
      <Container maxWidth="lg">
        <DataTable students={students} />
      </Container>
      <Button variant="outlined" className="btn-csv-download">
        <i class="fa fa-download" aria-hidden="true" />
        <CSVLink filename={"subsidy.csv"} data={csvData} target="_blank">
          {" "}
          Download .csv file{" "}
        </CSVLink>
      </Button>
    </Fragment>
  );
};

Expenses.propTypes = {
  getClassroomById: PropTypes.func.isRequired,
  getUserDaycareDetails: PropTypes.func.isRequired,
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
  getUserDaycareDetails,
  getStudentsByDaycare
})(Expenses);
