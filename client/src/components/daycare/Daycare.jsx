import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDaycareById } from '../../actions/daycare';
import { getClassroomsByDaycare, addStudent } from '../../actions/classroom';
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    marginTop: '15px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Daycare = ({
  getDaycareById,
  getClassroomsByDaycare,
  addStudent,
  daycare: { daycare, loaded },
  classroom: { classroom, classrooms },
  auth: { user, isAuthenticated },
  match
}) => {
  const [formData, setFormData] = useState({
    class_id: '',
    firstname: '',
    lastname: '',
    parentname: '',
    formClassroom: 'Pick Classroom'
  });

  const { class_id, firstname, lastname, parentname, formClassroom } = formData;

  const onChange = e => {
    if (e.target.name === 'formClassroom') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        class_id: e.target.id
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

    console.log(`target: ${e.target}`);
    console.log(`targetname: ${e.target.name}, targetval: ${e.target.value}`);
    console.log(`targetkey: ${e.target.id}`);

    console.log(formData);
  };

  const onSubmit = e => {
    e.preventDefault();
    addStudent(formData);
  };

  const classes = useStyles();

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
          <h1 className='large text-primary'>{daycare.company}</h1>
          <p className='lead'>
            <i className='fas fa-user'> {user && user.name}</i>
          </p>
          <Link to='/dashboard' className='btn btn-dark'>
            Back To Dashboard
          </Link>{' '}
          {isAuthenticated && loaded && user._id === daycare.user && (
            <Fragment>
              <Link to='/daycare-classrooms' className='btn btn-dark'>
                View Classrooms
              </Link>{' '}
              <Link to='/daycare-students' className='btn btn-dark'>
                View Students
              </Link>{' '}
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Card className={classes.card}>
                    <CardHeader title='Classrooms' />
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
                              <ListItemText primary={classes.title} />
                              <IconButton
                                style={{ margin: '0 1rem' }}
                                edge='end'
                              >
                                <GrainIcon />
                              </IconButton>
                              <IconButton edge='end' aria-label='delete'>
                                <DeleteIcon />
                              </IconButton>
                            </ListItem>
                          );
                        }
                      })}
                    </List>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card className={classes.card}>
                    <CardHeader title='Add Student' />
                  </Card>
                  <FormControl
                    className={classes.formControl}
                    onSubmit={e => onSubmit(e)}
                  >
                    <TextField
                      name='firstname'
                      value={firstname}
                      onChange={e => onChange(e)}
                      id='standard-basic'
                      label='First Name'
                    />
                    <TextField
                      name='lastname'
                      value={lastname}
                      onChange={e => onChange(e)}
                      id='standard-basic'
                      label='Last Name'
                    />
                    <TextField id='standard-basic' label='Parent Full Name' />
                    <Select
                      id={class_id}
                      name={'formClassroom'}
                      value={formClassroom}
                      onChange={e => onChange(e)}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value='Pick Classroom' disabled>
                        Pick Classroom
                      </MenuItem>
                      {classrooms.map(_class => {
                        return (
                          <MenuItem
                            value={_class.title}
                            name='formClassroom'
                            id={_class._id}
                          >
                            {_class.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      Choose a classroom for the student
                    </FormHelperText>
                    <Fab
                      variant='extended'
                      className='primary'
                      style={{ marginTop: '10px', background: '#17a2b8' }}
                      onClick={onSubmit}
                    >
                      <SaveAltIcon />
                      Add
                    </Fab>
                  </FormControl>
                </Grid>
              </Grid>
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
  addStudent: PropTypes.func.isRequired,
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
  addStudent,
  getClassroomsByDaycare
})(Daycare);
