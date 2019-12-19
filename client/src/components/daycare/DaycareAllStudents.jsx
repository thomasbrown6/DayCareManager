import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getStudentsForDaycare } from '../../actions/daycare';
import DaycareTable from './DaycareTable';
import { makeStyles } from '@material-ui/core/styles';

const DaycareAllStudents = ({
  getStudentsForDaycare,
  daycare: { daycare, loaded },
  classroom: { classroom, classrooms },
  students,
  auth
}) => {
useEffect(() => {
  getStudentsForDaycare(match.params.id);
}, [getStudentsForDaycare, match.params.id]);
  return (
    <Fragment>
      {daycare === null || !loaded ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/dashboard' className='btn btn-dark'>
            Back To Dashboard
          </Link>{' '}
          {auth.isAuthenticated &&
            auth.loaded &&
            auth.user._id === daycare.user && (
              <Fragment>
                <Link
                  to={`/dashboard/daycare/${daycare._id}`}
                  className='btn btn-dark'
                >
                  Back To Classrooms
                </Link>{' '}
                



              </Fragment>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

Daycare.propTypes = {
  getStudentsForDaycare: PropTypes.func.isRequired,
  daycare: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  daycare: state.daycare,
  auth: state.auth,
  classroom: state.classroom,
  students: state.students
});

export default connect(mapStateToProps, { getStudentsForDaycare })(DaycareAllStudents);
