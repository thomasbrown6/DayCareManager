import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createDaycare } from "../../actions/daycare";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(23, 162, 184)"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const CreateDaycare = ({ createDaycare, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    city: "",
    state: ""
  });

  const { company, website, location, city, state } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      location: `${city}, ${state}`
    });

  const onSubmit = e => {
    e.preventDefault();
    createDaycare(formData, history);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <h1 className="header">Add Your Daycare</h1>
      <Typography variant="h5" className="center" gutterBottom>
        <i className="fas fa-user"></i> Let's get some information to start
        managing your daycare
      </Typography>{" "}
      <main className={classes.layout}>
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="company"
                label="Company Name"
                fullWidth
                name="company"
                value={company}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="website"
                name="website"
                value={website}
                label="Website"
                fullWidth
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="city"
                name="city"
                value={city}
                label="City"
                fullWidth
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="state"
                name="state"
                value={state}
                label="State/Province/Region"
                fullWidth
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <Link to="/dashboard">
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  className={classes.button}
                >
                  Go Back
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => onSubmit(e)}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </main>
    </React.Fragment>
  );
};

CreateDaycare.propTypes = {
  createDaycare: PropTypes.func.isRequired
};

export default connect(null, { createDaycare })(withRouter(CreateDaycare));
