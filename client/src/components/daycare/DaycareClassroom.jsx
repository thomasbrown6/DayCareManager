import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteClassroom, getCurrentProfile } from '../../actions/profile';
import DaycareTable from './DaycareTable';

const Classroom = ({ classroom, deleteClassroom, getCurrentProfile }) => {
  let classrooms;
  if (classroom) {
    classrooms = classroom.map(classes => (
      <tr key={classes._id}>
        <td>{classes.school}</td>
        <td className='hide-sm'>{classes.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{classes.from}</Moment> -{' '}
          {classes.to === null ? (
            'Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{classes.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={e => {
              deleteClassroom(classes._id);
              getCurrentProfile();
            }}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <Fragment>
      <h2 className='my-2'>Classroom</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{classrooms}</tbody>
      </table>
    </Fragment>
  );
};

Classroom.propTypes = {
  classroom: PropTypes.array.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

export default connect(null, { deleteClassroom, getCurrentProfile })(Classroom);
