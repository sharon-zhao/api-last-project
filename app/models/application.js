const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  }
})

module.exports = mongoose.model('Application', applicationSchema)
