import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "../dashboard/DashboardActions";
import { getUserDaycareDetails, deleteDaycare } from "../../actions/daycare";
import { getStudentsForDaycare } from "../../actions/student";
import { getClassroomsByDaycare } from "../../actions/classroom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
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
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  avatarheader: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "105vh",
    overflow: "auto"
  },
  fixedHeight: {
    height: 240
  }
}));

const Dashboard = ({
  getUserDaycareDetails,
  deleteDaycare,
  getStudentsForDaycare,
  getClassroomsByDaycare,
  auth: { user },
  match,
  daycare: { daycare, daycares, loaded },
  student
}) => {
  useEffect(() => {
    getUserDaycareDetails();
  }, [getUserDaycareDetails]);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className="Dashboard-container">
        <div className="myaccount">
          {" "}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.avatarheader}>
                {" "}
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                {user ? user.name : ""}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>xs=12 sm=6</Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>xs=12 sm=6</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </main>
  );
};

Dashboard.propTypes = {
  getUserDaycareDetails: PropTypes.func.isRequired,
  deleteDaycare: PropTypes.func.isRequired,
  getStudentsForDaycare: PropTypes.func.isRequired,
  getClassroomsByDaycare: PropTypes.func.isRequired,
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
  getUserDaycareDetails,
  deleteDaycare,
  getStudentsForDaycare,
  getClassroomsByDaycare
})(Dashboard);
