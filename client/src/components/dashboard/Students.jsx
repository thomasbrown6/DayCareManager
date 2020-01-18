import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getUserDaycares } from '../../actions/daycare';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

const Students = ({ classrooms, daycare: { daycare, daycares, loaded } }) => {
  const classes = useStyles();
  if (classrooms != null && classrooms.length > 0) {
    return (
      <React.Fragment>
        <Title>Students</Title>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Classroom</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classrooms.map(classroom => (
              <Fragment>
                {classroom.students.map(student => (
                  <TableRow key={student._id}>
                    <TableCell>{`${student.lastname}, ${student.firstname}`}</TableCell>
                    <TableCell>{classroom.name}</TableCell>
                    <TableCell>{student.status}</TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color='text-primary' to='/all-students'>
            See all students
          </Link>
        </div>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

Students.propTypes = {
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  daycare: state.daycare
});

export default connect(mapStateToProps)(Students);
