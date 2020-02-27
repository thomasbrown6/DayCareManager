const mongoose = require("mongoose");

const DaycareSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: {
    type: String,
    required: true
  },
  studentcount: {
    type: Number
  },
  totaltuition: {
    type: Number
  },
  totaldixonoveragecharges: {
    type: Number
  },
  totalparentfees: {
    type: Number
  },
  totalsubsidypayments: {
    type: Number
  },
  totaltotal: {
    type: Number
  },
  website: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  classrooms: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
      daycare: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "daycare",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      students: [
        {
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
            type: String,
            required: true
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
        }
      ],
      teachers: [
        {
          firstname: {
            type: String
          },
          lastname: {
            type: String
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Daycare = mongoose.model("daycare", DaycareSchema);
