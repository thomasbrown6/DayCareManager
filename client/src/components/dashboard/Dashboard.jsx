import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getUserDaycareDetails, deleteDaycare } from "../../actions/daycare";
import { getStudentsForDaycare } from "../../actions/student";
import { getClassroomsByDaycare } from "../../actions/classroom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Totals from "./Totals";
import Students from "./Students";
import DaycarePost from "../daycare/DaycarePost";

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
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
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

  if (!loaded && daycares == null) {
    return <Spinner />;
  } else if ((loaded && daycares == null) || daycare == null) {
    getUserDaycareDetails();
    if (daycare != null) getClassroomsByDaycare(daycare._id);

    return (
      <main className={classes.content}>
        <Container
          maxWidth="lg"
          className={classes.container + " Dashboard-container"}
        >
          <div className="center">
            <h1 className="header">
              You have not yet set up any daycare centers yet, please add one to
              get started
            </h1>
            <Link to="/create-daycare" className="btn btn-primary my-1">
              Create Daycare
            </Link>
          </div>
        </Container>
      </main>
    );
  } else if (loaded && daycares != null && daycare != null) {
    if (daycare != null) getClassroomsByDaycare(daycare._id);

    if (student == null) getStudentsForDaycare(daycare._id);
    return (
      <main className={classes.content}>
        <Container
          maxWidth="lg"
          className={classes.container + " Dashboard-container"}
        >
          <h1 className="header">{daycare.company}</h1>
          <DashboardActions />
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              {/* <Chart /> */}
              <DaycarePost key={"post.title"} daycare={daycare} />
            </Grid>
            {/* Recent Totals */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper + " tricary"}>
                <Totals
                  title="Tuition"
                  amount={daycare.totaltuition}
                  date={daycare.recentdate}
                  link="/expenses"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper + " tricary"}>
                <Totals
                  title="Parent Fees"
                  amount={daycare.totalparentfees}
                  date={daycare.recentdate}
                  link="/expenses"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper + " tricary"}>
                <Totals
                  title="Dixon Overage Charges"
                  amount={daycare.totaldixonoveragecharges}
                  date={daycare.recentdate}
                  link="/expenses"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper + " tricary"}>
                <Totals
                  title="Subsidy Payments"
                  amount={daycare.totalsubsidypayments}
                  date={daycare.recentdate}
                  link="/expenses"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper + " tricary"}>
                <Totals
                  title="Totals"
                  amount={daycare.totaltotal}
                  date={daycare.recentdate}
                  link="/expenses"
                />
              </Paper>
            </Grid>
            {/* Students */}
            <Grid item xs={12}>
              {daycare.classrooms.count > 0 && (
                <Paper className={classes.paper}>
                  <Students classrooms={daycare.classrooms} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
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
