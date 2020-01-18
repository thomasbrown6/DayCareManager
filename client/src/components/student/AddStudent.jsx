import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addStudent } from '../../actions/classroom';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const AddStudent = ({
  addStudent,
  classroom: { classroom, classrooms },
  daycare
}) => {
  const [formData, setFormData] = useState({
    class_id: '',
    firstname: '',
    lastname: '',
    parentname1: '',
    parentname2: '',
    formClassroom: classroom.name
  });

  const {
    class_id,
    firstname,
    lastname,
    parentname1,
    parentname2,
    formClassroom
  } = formData;

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

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
  };

  const onSubmit = e => {
    e.preventDefault();
    addStudent(formData, daycare._id, classroom._id);
  };

  const classes = useStyles();

  return (
    <Fragment>
      <FormControl className={classes.formControl} onSubmit={e => onSubmit(e)}>
        <TextField
          label='First Name'
          id='standard-basic'
          name='firstname'
          value={firstname}
          onChange={e => onChange(e)}
        />
        <TextField
          label='Last Name'
          id='standard-basic'
          name='lastname'
          value={lastname}
          onChange={e => onChange(e)}
        />
        <TextField
          label='Parent Full Name'
          id='standard-basic'
          name='parentname1'
          value={parentname1}
          onChange={e => onChange(e)}
        />
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
                value={_class.name}
                name='formClassroom'
                id={_class._id}
              >
                {_class.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>Choose a classroom for the student</FormHelperText>
        <Fab
          variant='extended'
          className='primary'
          style={{ marginTop: '10px', background: '#17a2b8' }}
          onClick={e => onSubmit(e)}
        >
          <SaveAltIcon />
          Add Student
        </Fab>
      </FormControl>
    </Fragment>
  );
};

AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classroom: state.classroom
});

export default connect(mapStateToProps, {
  addStudent
})(AddStudent);
