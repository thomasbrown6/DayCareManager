import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStudent } from "../../actions/classroom";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CurrencyFormat from "react-currency-format";

const AddStudent = ({ addStudent, classrooms, daycare, error }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    parentname1: "",
    parentname2: "",
    classroomname: "",
    dixontuition: "$910.00",
    dixonoveragecharge: "$0",
    parentfee: "$0",
    subsidypayment: "$0"
  });

  const {
    firstname,
    lastname,
    parentname1,
    parentname2,
    classroomname,
    dixontuition,
    dixonoveragecharge,
    parentfee,
    subsidypayment
  } = formData;

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const onChange = e => {
    // if (e.target.name === "classroomname") {
    //   let classroomobject = e.target.value.split(",");
    //   setFormData({
    //     ...formData,
    //     classroomname: classroomobject[0],
    //     class_id: classroomobject[1]
    //   });
    //   console.log("class id: " + classroomobject[1]);
    //   console.log("target value: " + classroomobject[0]);
    //   console.log("e.target.name: " + e.target.name);
    //   console.log("classroomname: " + classroomname);
    // } else {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    //}
  };

  const onSubmit = e => {
    e.preventDefault();
    addStudent(formData, daycare._id);
    if (isEmpty(error)) {
      setFormData({
        firstname: "",
        lastname: "",
        parentname1: "",
        parentname2: "",
        classroomname: "",
        dixontuition: "$910.00",
        dixonoveragecharge: "$0",
        parentfee: "$0",
        subsidypayment: "$0"
      });
    }
  };

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const classes = useStyles();

  return (
    <Fragment>
      <FormControl
        className={classes.formControl + " ft-r"}
        onSubmit={e => onSubmit(e)}
      >
        <TextField
          label="First Name"
          id="standard-basic"
          name="firstname"
          value={firstname}
          onChange={e => onChange(e)}
        />
        <TextField
          label="Last Name"
          id="standard-basic"
          name="lastname"
          value={lastname}
          onChange={e => onChange(e)}
        />
        <TextField
          label="Parent 1 Full Name"
          id="standard-basic"
          name="parentname1"
          value={parentname1}
          onChange={e => onChange(e)}
        />
        <TextField
          label="Parent 2 Full Name"
          id="standard-basic"
          name="parentname2"
          value={parentname2}
          onChange={e => onChange(e)}
        />
        <CurrencyFormat
          label="Dixon Tuition"
          customInput={TextField}
          name="dixontuition"
          value={dixontuition}
          thousandSeparator={true}
          prefix={"$"}
          onChange={e => onChange(e)}
        />
        <CurrencyFormat
          label="Dixon Overage Charge"
          customInput={TextField}
          name="dixonoveragecharge"
          value={dixonoveragecharge}
          thousandSeparator={true}
          prefix={"$"}
          onChange={e => onChange(e)}
        />
        <CurrencyFormat
          label="Parent Fee"
          customInput={TextField}
          name="parentfee"
          value={parentfee}
          thousandSeparator={true}
          prefix={"$"}
          onChange={e => onChange(e)}
        />
        <CurrencyFormat
          label="Subsidy Payment"
          customInput={TextField}
          name="subsidypayment"
          value={subsidypayment}
          thousandSeparator={true}
          prefix={"$"}
          onChange={e => onChange(e)}
        />
        <Select
          id="standard-basic"
          name="classroomname"
          value={classroomname}
          onChange={e => onChange(e)}
          displayEmpty
          className={classes.selectEmpty}
        >
          {Array.isArray(classrooms) &&
            classrooms.map(_class => {
              return (
                <MenuItem
                  value={`${_class.name}`}
                  name="classroomname"
                  id={_class._id}
                >
                  {_class.name}
                </MenuItem>
              );
            })}
        </Select>
        <FormHelperText>Choose a classroom for the student</FormHelperText>
        <Fab
          variant="extended"
          className="primary"
          style={{ marginTop: "10px", background: "#17a2b8" }}
          onClick={e => onSubmit(e)}
        >
          <SaveAltIcon />
          Add Student
        </Fab>
      </FormControl>
    </Fragment>
  );
};

AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired
};

export default connect(null, {
  addStudent
})(AddStudent);
