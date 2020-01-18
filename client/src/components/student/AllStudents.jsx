import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Daycare from '../../components/daycare/Daycare';
import { getUserDaycares, deleteDaycare } from '../../actions/daycare';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../dashboard/Title';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import EditTable from './EditTable';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
}));

const AllStudents = ({
  getUserDaycares,
  deleteDaycare,
  auth: { user },
  daycare: { daycare, daycares, loaded }
}) => {
  useEffect(() => {
    getUserDaycares();
  }, [getUserDaycares]);

  const classes = useStyles();
  if (daycare == null) getUserDaycares();

  return !loaded && (daycares == null || daycare == null) ? (
    <Spinner />
  ) : (
    <main className={classes.content}>
      <Container maxWidth='lg' className={classes.container}>
        {/* <Title>Students</Title>
            <Table size='large'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Classroom</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {daycare.classrooms.map(classroom => (
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
            </Table> */}
        <EditTable />
        )}
      </Container>
    </main>
  );
};

AllStudents.propTypes = {
  getUserDaycares: PropTypes.func.isRequired,
  deleteDaycare: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  daycare: PropTypes.object.isRequired,
  classrooms: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  daycare: state.daycare,
  classrooms: state.classrooms
});

export default connect(mapStateToProps, { getUserDaycares, deleteDaycare })(
  AllStudents
);
