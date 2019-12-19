import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createDaycare } from '../../actions/daycare';

const CreateDaycare = ({ createDaycare, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: ''
  });

  const {
    company,
    website,
    location
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createDaycare(formData, history);
  };

  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Add Your Daycare</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to start managing your daycare
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
     
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn btn-light my-1'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateDaycare.propTypes = {
  createDaycare: PropTypes.func.isRequired
};

export default connect(null, { createDaycare })(withRouter(CreateDaycare));
