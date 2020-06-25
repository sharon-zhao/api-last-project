'use strict'
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const Cart = require('../models/cart-models')

router.post('/shopping-cart', requireToken, (req, res, next) => {
  console.log(req.body)
  const cart = req.body.cart
  const user = req.user
  User.findById(user)
    .then(user => {
      user.shoppingCarts.push(shoppingCart)
      return user.save()
    })
    // making sure the request returns the CARTS
    .then(currUser => res.status(201).json({ shoppingCarts: currUser.shoppingCarts.toObject() }))
    .catch(next)
})
