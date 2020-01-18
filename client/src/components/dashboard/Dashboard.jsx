import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Daycare from './Daycare';
import { getUserDaycares, deleteDaycare } from '../../actions/daycare';
import { getStudentsForDaycare } from '../../actions/student';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Students from './Students';
import DaycarePost from '../daycare/DaycarePost';

function Copyright() {
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
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  container: {
    //   paddingTop: theme.spacing(4),
    //   paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  fixedHeight: {
    height: 240
  }
}));

const Dashboard = ({
  getUserDaycares,
  deleteDaycare,
  getStudentsForDaycare,
  auth: { user },
  match,
  daycare: { daycare, daycares, loaded },
  student
}) => {
  useEffect(() => {
    getUserDaycares();
  }, [getUserDaycares]);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!loaded && daycares == null) {
    return <Spinner />;
  } else if ((loaded && daycares == null) || daycare == null) {
    getUserDaycares();
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Fragment>
            <p>
              You have not yet set up any daycare centers yet, please add one to
              get started
            </p>
            <Link to='/create-daycare' className='btn btn-primary my-1'>
              Create Daycare
            </Link>
          </Fragment>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  } else if (loaded && daycares != null && daycare != null) {
    if (student == null) getStudentsForDaycare(daycare._id);
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <h1 className='medium center'>{daycare.company}</h1>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              {/* <Chart /> */}
              <DaycarePost key={'post.title'} daycare={daycare} />
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Students */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Students classrooms={daycare.classrooms} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  }
};

Dashboard.propTypes = {
  getUserDaycares: PropTypes.func.isRequired,
  deleteDaycare: PropTypes.func.isRequired,
  getStudentsForDaycare: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  daycare: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  daycare: state.daycare,
  student: state.student
});

export default connect(mapStateToProps, {
  getUserDaycares,
  deleteDaycare,
  getStudentsForDaycare
})(Dashboard);
