import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GrainIcon from '@material-ui/icons/Grain';
import { connect } from 'react-redux';
import { getClassroomById, deleteClassroom } from '../../actions/classroom';

const ViewClassroomsMin = ({
  classrooms,
  getClassroomById,
  deleteClassroom,
  daycare_id
}) => {
  const selectClassroom = (e, class_id, name) => {
    e.preventDefault();
    getClassroomById(daycare_id, class_id);
  };

  const deleteClass = (e, class_id) => {
    e.preventDefault();
    deleteClassroom(daycare_id, class_id);
  };
  if (classrooms && classrooms.length > 0) {
    return (
      <Fragment>
        {classrooms === null || classrooms.length === 0 ? (
          <Fragment />
        ) : (
          <List>
            {classrooms.map((classes, index) => {
              if (index < 5) {
                return (
                  <ListItem
                    key={classes._id}
                    style={{
                      background: '#f4f4f4'
                    }}
                  >
                    <ListItemText primary={classes.name} />
                    <IconButton
                      onClick={e =>
                        selectClassroom(e, classes._id, classes.name)
                      }
                      style={{ margin: '0 1rem' }}
                      edge='end'
                    >
                      <GrainIcon />
                    </IconButton>
                    <IconButton
                      onClick={e => deleteClass(e, classes._id)}
                      edge='end'
                      aria-label='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              }
            })}
          </List>
        )}
      </Fragment>
    );
  } else {
    return <Fragment />;
  }
};

ViewClassroomsMin.propTypes = {
  getClassroomById: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired
};

export default connect(null, { getClassroomById, deleteClassroom })(
  ViewClassroomsMin
);
