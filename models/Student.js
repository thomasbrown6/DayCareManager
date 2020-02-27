const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  daycare: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "daycare"
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom"
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  classroomname: {
    type: String
  },
  dixontuition: {
    type: Number
  },
  dixonoveragecharge: {
    type: Number
  },
  parentfee: {
    type: Number
  },
  subsidypayment: {
    type: Number
  },
  total: {
    type: Number
  },
  difference: {
    type: Number
  },
  parentname1: {
    type: String
  },
  parentname2: {
    type: String
  }
});

module.exports = Student = mongoose.model("student", StudentSchema);
