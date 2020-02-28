import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import { getUserDaycareDetails } from "../../actions/daycare";
import { getClassroomById, deleteClassroom } from "../../actions/classroom";
import { getClassroomsByDaycare } from "../../actions/classroom";
import DashboardActions from "../dashboard/DashboardActions";
import AddClassroom from "./AddClassroom";
import ListDropDown from "./ListDropDown";

const Classrooms = ({
  classroom: { classrooms, loaded },
  getUserDaycareDetails,
  getClassroomsByDaycare,
  daycare: { daycare }
}) => {
  useEffect(() => {
    getUserDaycareDetails();
  }, [getUserDaycareDetails]);
  if (daycare != null && !loaded) {
    getClassroomsByDaycare(daycare._id);
  }

  if (classrooms && classrooms.length > 0) {
    return (
      <Fragment>
        <h1 className="header">Classrooms</h1>
        <DashboardActions />
        <div className="w-100 wrapper">
          <Container className="ft-l" maxWidth="sm">
            {classrooms === null ? (
              <h2>No classrooms, click here to add classrooms</h2>
            ) : (
              <List className="no-padding ">
                {Array.isArray(classrooms) &&
                  classrooms.map((classroom, index) => {
                    if (index < 30) {
                      return <ListDropDown classroom={classroom} />;
                    }
                  })}
              </List>
            )}
          </Container>
          <AddClassroom />
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h1 className="header">Classrooms</h1>
        <DashboardActions />
        <h2>No classrooms, use the form to add classrooms</h2>
        <AddClassroom />
      </Fragment>
    );
  }
};

Classrooms.propTypes = {
  getClassroomById: PropTypes.func.isRequired,
  getUserDaycareDetails: PropTypes.func.isRequired,
  getClassroomsByDaycare: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classroom: state.classroom,
  daycare: state.daycare
});

export default connect(mapStateToProps, {
  getClassroomById,
  deleteClassroom,
  getUserDaycareDetails,
  getClassroomsByDaycare
})(Classrooms);

{
  /* <List>
  {classrooms.map((classes, index) => {
    if (index < 30) {
      return (
        <Fragment>

          <ListItem
            key={classes._id}
            style={{
              background: "#f4f4f4"
            }}
          >
            <ListItemText primary={classes.name} />
            <IconButton
              onClick={e =>
                selectClassroom(e, classes._id, classes.name)
              }
              style={{ margin: "0 1rem" }}
              edge="end"
            >
              <GrainIcon />
            </IconButton>
            <IconButton
              onClick={e => deleteClass(e, classes._id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </Fragment>
      );
    }
  })}
</List>
          )} */
}
