import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDaycareById } from '../../actions/daycare';
import { getClassroomsByDaycare } from '../../actions/classroom';
import DaycareTable from './DaycareTable';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GrainIcon from '@material-ui/icons/Grain';

const Daycare = ({
  getDaycareById,
  getClassroomsByDaycare,
  daycare: { daycare, loaded },
  classroom: { classroom, classrooms },
  auth,
  match
}) => {
  useEffect(() => {
    getDaycareById(match.params.id);
    getClassroomsByDaycare(match.params.id);
  }, [getDaycareById, getClassroomsByDaycare, match.params.id]);

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
                <Link to='/daycare-kids' className='btn btn-dark'>
                  View All Kids
                </Link>{' '}
                <List>
                  {classrooms.map(classes => (
                    <ListItem
                      style={{
                        background: '#f4f4f4'
                      }}
                    >
                      <ListItemText primary={classes.title} />
                      <IconButton style={{ margin: '0 1rem' }} edge='end'>
                        <GrainIcon />
                      </IconButton>
                      <IconButton edge='end' aria-label='delete'>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

Daycare.propTypes = {
  getDaycareById: PropTypes.func.isRequired,
  getClassroomsByDaycare: PropTypes.func.isRequired,
  daycare: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  daycare: state.daycare,
  auth: state.auth,
  classroom: state.classroom
});

export default connect(mapStateToProps, {
  getDaycareById,
  getClassroomsByDaycare
})(Daycare);
