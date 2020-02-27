import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const DashboardActions = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="outlined">
        <Link to="/dashboard" className="text-primary">
          <i className="fa fa-home text-primary"></i>Dashboard
        </Link>
      </Button>
      <Button variant="outlined">
        <Link to="/classrooms" className="text-primary">
          <i className="fa fa-users text-primary"></i> Classrooms
        </Link>
      </Button>
      <Button variant="outlined">
        <Link to="/students" className="text-primary">
          <i class="fa fa-child"></i>
          Students
        </Link>
      </Button>
      <Button variant="outlined">
        <Link to="/expenses" className="text-primary">
          <i className="fa fa-money text-primary"></i> Expenses
        </Link>
      </Button>
      {/* <Link to="/dashboard" className="btn btn-light">
        <i className="fa fa-users text-primary"></i> Daycare
      </Link>
      <Link to="/classrooms" className="btn btn-light">
        <i className="fa fa-users text-primary"></i> Classrooms
      </Link>
      <Link to="/students" className="btn btn-light">
        <i className="fa fa-users text-primary"></i> Students
      </Link>
      <Link to="/expenses" className="btn btn-light">
        <i className="fa fa-users text-primary"></i> Expenses
      </Link> */}
    </div>
  );
};

export default DashboardActions;
