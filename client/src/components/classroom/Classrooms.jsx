import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import { getUserDaycares } from "../../actions/daycare";
import { getClassroomById, deleteClassroom } from "../../actions/classroom";
import { getClassroomsByDaycare } from "../../actions/classroom";
import DashboardActions from "../dashboard/DashboardActions";
import AddClassroom from "./AddClassroom";
import ListDropDown from "../../components/table/ListDropDown";

const Classrooms = ({
  classroom: { classrooms },
  getUserDaycares,
  getClassroomsByDaycare,
  daycare: { daycare }
}) => {
  useEffect(() => {
    getUserDaycares();
  }, [getUserDaycares]);
  if (daycare != null) {
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
              <List>
                {classrooms.map((classroom, index) => {
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
        <h3>Add classrooms</h3>
        <AddClassroom />
      </Fragment>
    );
  }
};

Classrooms.propTypes = {
  getClassroomById: PropTypes.func.isRequired,
  getUserDaycares: PropTypes.func.isRequired,
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
  getUserDaycares,
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
