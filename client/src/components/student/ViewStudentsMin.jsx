import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GrainIcon from '@material-ui/icons/Grain';
import { deleteStudent } from '../../actions/classroom';
import { connect } from 'react-redux';

const ViewStudentsMin = ({
  classroom,
  deleteStudent,
  daycare_id,
  class_id
}) => {
  const deleteStu = (e, id) => {
    e.preventDefault();
    deleteStudent(daycare_id, class_id, id);
  };
  if (classroom.students && classroom.students.length > 0) {
    return (
      <List>
        {classroom.students === null || classroom.students.length === 0 ? (
          <Fragment />
        ) : (
          <Fragment>
            {classroom.students.map((student, index) => {
              if (index < 5) {
                return (
                  <ListItem
                    key={student._id}
                    style={{
                      background: '#f4f4f4'
                    }}
                  >
                    <ListItemText
                      primary={`${student.lastname}, ${student.firstname}`}
                    />
                    <IconButton style={{ margin: '0 1rem' }} edge='end'>
                      <GrainIcon />
                    </IconButton>
                    <IconButton
                      onClick={e => deleteStu(e, student._id)}
                      edge='end'
                      aria-label='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              }
            })}
          </Fragment>
        )}
      </List>
    );
  } else {
    return <Fragment />;
  }
};

ViewStudentsMin.propTypes = {
  deleteStudent: PropTypes.func.isRequired
};

export default connect(null, { deleteStudent })(ViewStudentsMin);
