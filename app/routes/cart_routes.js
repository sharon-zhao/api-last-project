'use strict'
// require in dependencies, Post model, middleware
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const Cart = require('../models/cart')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
// ************************************* //

// INDEX - GET /posts (we will not req a token)
router.get('/my-course', requireToken, (req, res, next) => {
  Cart.find()
    .populate('owner', 'email username')
    .then(carts => {
      console.log(carts)
      return carts.map(cart => cart.toObject())
    })
    .then(carts => res.status(200).json({ carts: carts }))
    .catch(next)
})

// SHOW - GET /posts/:id (we will not req a token)

// CREATE - POST /posts
router.post('/add-course', requireToken, (req, res, next) => {
  console.log(req.body.cart)
  req.body.owner = req.user._id
  Cart.create(req.body)
    .then(cart => {
      res.status(201).json({ cart: cart })
      console.log(cart)
    })
    .catch(next)
})

// UPDATE - PATCH /posts/:id
router.patch('/my-course', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.cart.owner
  console.log(req.body)
  const user = req.user
  // User.findById(user)
  //   .then(user => {
  //     user.
  //   })
  //   .then(post => {
  //     requireOwnership(req, post)
  //     return post.updateOne(req.body.post)
  //   })
  //   .then(() => res.sendStatus(204))
  //   .catch(next)
})

// DESTROY - DELETE /posts/:id
router.delete('/my-course/:id', requireToken, (req, res, next) => {
  Cart.findById(req.params.id)
    .then(handle404)
    .then(cart => {
      requireOwnership(req, cart)
      cart.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
