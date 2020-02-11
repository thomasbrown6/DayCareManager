import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons dashboardactions'>
      <Link to='/daycares' className='btn btn-light'>
        <i className='fa fa-users text-primary'></i> Daycare
      </Link>
      <Link to='/classrooms' className='btn btn-light'>
        <i className='fa fa-users text-primary'></i> Classrooms
      </Link>
      <Link to='/students' className='btn btn-light'>
        <i className='fa fa-users text-primary'></i> Students
      </Link>
    </div>
  );
};

export default DashboardActions;
