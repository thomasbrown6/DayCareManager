const mongoose = require('mongoose');

const DaycareSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String,
    required: true
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
  }
});

module.exports = Daycare = mongoose.model('daycare', DaycareSchema);
