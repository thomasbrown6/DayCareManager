import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/create-daycare' className='btn btn-light'>
        <i className='fa fa-users text-primary'></i> Add Daycare
      </Link>
    </div>
  );
};

export default DashboardActions;