import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserDaycares } from '../../actions/daycare';

const Home = ({
  getUserDaycares,
  isAuthenticated,
  daycare: { daycare, daycares, loaded }
}) => {
  useEffect(() => {
    getUserDaycares();
  }, [getUserDaycares]);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Daycare Manager</h1>
          <p className='lead'>
            Create a account, keep track of your daycare expenses and amount
            owed.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  getUserDaycares: PropTypes.func.isRequired,
  daycare: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  daycare: state.daycare,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getUserDaycares })(Home);
