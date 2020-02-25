import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

var alertStyle = {
  width: "100%",
  "& > * + *": {
    marginTop: "2px"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const Alert = ({ alerts }) => {
  const classes = useStyles();

  if (alerts !== null && alerts.length > 0) {
    return alerts.map(alert => (
      <div key={alert.id} className={classes.root}>
        <MuiAlert severity="success">{alert.msg}</MuiAlert>
      </div>
    ));
  } else {
    return <Fragment />;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

{
  /* <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    {alert.msg}
</div> */
}
