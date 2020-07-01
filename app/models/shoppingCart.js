const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Course = require('./course')

const cartSchema = new Schema({
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  stripeId: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

cartSchema.virtual('totalCost').get(function () {
  let cost = 0
  if (this.courses.length === 0) {
    return cost
  } else {
    for (let i = 0; i < this.courses.length; i++) {
      cost += this.courses[i].price
    }
    return cost
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = {
  cartSchema,
  Cart
}
