import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDaycare, getUserDaycares } from '../../actions/daycare';

const Daycare = ({ daycare, deleteDaycare, getUserDaycares }) => {
  let daycares;
  if (daycare) {
    daycares = daycare.map(dc => (
      <tr key={dc._id} className='border-bottom-1'>
        <td className='font-bold'>{dc.company}</td>
        <td className='hide-sm'>{dc.location}</td>
        <td className='hide-sm text-primary'>{dc.website}</td>
        <td>
          <Link to={`/dashboard/daycare/${dc._id}`}>
            <button className='btn btn-primary'>Select</button>
          </Link>
          <button
            onClick={e => {
              deleteDaycare(dc._id);
              getUserDaycares();
            }}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <Fragment>
      <h2 className='my-2'>Daycares</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Location</th>
            <th className='hide-sm'>Website</th>
          </tr>
        </thead>
        <tbody>{daycares}</tbody>
      </table>
    </Fragment>
  );
};

Daycare.propTypes = {
  daycare: PropTypes.array.isRequired,
  deleteDaycare: PropTypes.func.isRequired,
  getUserDaycares: PropTypes.func.isRequired
};

export default connect(null, { deleteDaycare, getUserDaycares })(Daycare);
