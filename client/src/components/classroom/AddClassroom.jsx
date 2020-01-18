import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addClassroom } from '../../actions/classroom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const AddClassroom = ({ daycare, addClassroom }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const { name, description } = formData;

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    console.log('submit triggered');
    e.preventDefault();
    addClassroom(formData, daycare._id);
  };

  const classes = useStyles();

  return (
    <Fragment>
      <FormControl className={classes.formControl} onSubmit={e => onSubmit(e)}>
        <TextField
          label='Class Name'
          id='standard-basic'
          name='name'
          value={name}
          onChange={e => onChange(e)}
        />
        <TextField
          label='Description'
          id='standard-basic'
          name='description'
          value={description}
          onChange={e => onChange(e)}
        />
        <Fab
          variant='extended'
          className='primary'
          style={{ marginTop: '10px', background: '#17a2b8' }}
          onClick={e => onSubmit(e)}
        >
          <SaveAltIcon />
          Add Class
        </Fab>
      </FormControl>
    </Fragment>
  );
};

AddClassroom.propTypes = {
  addClassroom: PropTypes.func.isRequired
};

export default connect(null, { addClassroom })(AddClassroom);
