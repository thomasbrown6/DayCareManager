import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addClassroom } from "../../actions/classroom";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { PanToolRounded, PhotoFilterSharp } from "@material-ui/icons";

const AddClassroom = ({ daycare: { daycare }, addClassroom }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const { name, description } = formData;
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  // useEffect(() => {
  //   document.addEventListener("keyup", doc_keyUp, false);
  // }, []);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    addClassroom(formData, daycare._id);
  };

  //  const doc_keyUp = e => {
  //   console.log("hit function");
  //   if (e.keyCode == 13 && !submitting) {
  //     setSubmitting({ submitting: true });
  //     onSubmit(e);
  //     setSubmitting({ submitting: false });
  //   }
  // };

  const classes = useStyles();

  return (
    <Fragment>
      <FormControl
        className={classes.formControl + " ft-r add-form"}
        onSubmit={e => onSubmit(e)}
      >
        <h2>New Classroom</h2>
        <TextField
          label="Class Name"
          id="standard-basic"
          name="name"
          value={name}
          onChange={e => onChange(e)}
        />
        {/* <TextField
          label="Description"
          id="standard-basic"
          name="description"
          value={description}
          onChange={e => onChange(e)}
        /> */}
        <Fab
          variant="extended"
          className="primary"
          style={{ marginTop: "10px", background: "#17a2b8" }}
          onClick={e => onSubmit(e)}
        >
          <SaveAltIcon />
          Add Classroom
        </Fab>
      </FormControl>
    </Fragment>
  );
};

AddClassroom.propTypes = {
  addClassroom: PropTypes.func.isRequired,
  daycare: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  daycare: state.daycare
});

export default connect(mapStateToProps, { addClassroom })(AddClassroom);
