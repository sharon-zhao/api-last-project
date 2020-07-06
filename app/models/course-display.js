const mongoose = require('mongoose')

const displaySchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: true
  },
  url:{
    type: String,
    required: true
  },
  discreption: {
    type: String,
    required: true
  },
  link:{
    type: String,
    required: true
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

module.exports = mongoose.model('Dispaly', displaySchema)
