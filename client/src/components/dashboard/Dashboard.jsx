import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Daycare from './Daycare';
import { getUserDaycares, deleteDaycare } from '../../actions/daycare';

const Dashboard = ({
  getUserDaycares,
  deleteDaycare,
  auth: { user },
  daycare: { daycares, loaded }
}) => {
  useEffect(() => {
    getUserDaycares();
  }, [getUserDaycares]);


  return !loaded && daycares == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'> Welcome {user && user.name}</i>
      </p>
      {daycares != null && daycares.length > 0 ? (
        <Fragment>
          <DashboardActions />
          {/* <div className="my-2"><button onClick={() => deleteDaycare()} className="btn btn-danger">
            <i className="fas fa-user-minus">Delete My Account</i></button></div> */}
            <Daycare daycare={daycares} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up any daycare centers yet, please add one to get started</p>
          <Link to='/create-daycare' className='btn btn-primary my-1'>
            Create Daycare
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getUserDaycares: PropTypes.func.isRequired,
  deleteDaycare: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  daycare: state.daycare
});

export default connect(mapStateToProps, { getUserDaycares, deleteDaycare })(Dashboard);
