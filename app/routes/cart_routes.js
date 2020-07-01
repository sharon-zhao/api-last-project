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
const User = require('../models/user')

router.patch('/shopping-cart', requireToken, (req, res, next) => {
  console.log(req.body)
  const shoppingCart = req.body.shoppingCart
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

router.get('/shopping-cart', requireToken, (req, res, next) => {
  User.findById(req.user)
    .populate('shoppingCarts.courses')
    .then(handle404)
    .then(user => {
      console.log(user)
      return user.shoppingCarts
    })
    .then(carts => res.status(200).json({ shoppingCart: carts.toObject() }))
    .catch(next)
})

router.patch('/shoppingcart', requireToken, (req, res, next) => {
  const course = req.body.data.cart
  const user = req.user
  User.findById(user)
    .then((user) => {
      const shoppingCart = user.shoppingCarts[0] // returns a matching subdocument
      console.log(typeof shoppingCart.courses)
      shoppingCart.courses.push(course) // updates the address while keeping its schema
      return user.save() // saves document with subdocuments and triggers validation
    })
    .then(shoppingCart => res.sendStatus(204))
    .catch(next)
})

module.exports = router
