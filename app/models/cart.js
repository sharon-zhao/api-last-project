const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: true
  },
  price: {
    type: Number,
    maxlength: 400,
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

module.exports = mongoose.model('Cart', cartSchema)
