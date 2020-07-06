'use strict'
// require in dependencies, Post model, middleware
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const Dispaly = require('../models/course-display')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
// ************************************* //

// INDEX - GET /posts (we will not req a token)
router.get('/mycourse', (req, res, next) => {
  Dispaly.find()
    .populate('owner', 'email username')
    .then(carts => {
      return carts.map(cart => cart.toObject())
    })
    .then(carts => res.status(200).json({ carts: carts }))
    .catch(next)
})

router.get('/mycourse/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Dispaly.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(result => res.status(200).json({ result: result }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

router.delete('/delete-cart', (req, res, next) => {
  const id = JSON.stringify(req.user._id)
  Dispaly.find()
    .populate('owner', 'email username')
    .then(carts => {
      const result = carts.filter(cart => JSON.stringify(cart.owner._id) == id)
      return result
    })
    // .then(handle404)
    .then(cart => {
      // requireOwnership(req, cart)
      const empty=cart.map(ele => ele.deleteOne())
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// CREATE - POST /posts
router.post('/addcourse', (req, res, next) => {
  console.log(req.body)
  Dispaly.create(req.body.cart)
    .then(cart => {
      res.status(201).json({ cart: cart })
    })
    .catch(next)
})

// UPDATE - PATCH /posts/:id

// DESTROY - DELETE /posts/:id
router.delete('/mycourse/:id', (req, res, next) => {
  Dispaly.findById(req.params.id)
    .then(handle404)
    .then(cart => {
      cart.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
