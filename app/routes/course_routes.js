'use strict'
// require in dependencies, Post model, middleware
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const Course = require('../models/course')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
// ************************************* //

// INDEX - GET /posts (we will not req a token)
router.get('/my-course', requireToken, (req, res, next) => {
  Course.find()
    .populate('owner', 'email username')
    .then(carts => {
      return carts.map(cart => cart.toObject())
    })
    .then(carts => res.status(200).json({ carts: carts }))
    .catch(next)
})

router.delete('/delete-cart', requireToken, (req, res, next) => {
  const id = JSON.stringify(req.user._id)
  Course.find()
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
router.post('/add-course', requireToken, (req, res, next) => {
  req.body.owner = req.user._id
  
  Course.create(req.body)
    .then(cart => {
      res.status(201).json({ cart: cart })
    })
    .catch(next)
})

// UPDATE - PATCH /posts/:id

// DESTROY - DELETE /posts/:id
router.delete('/my-course/:id', requireToken, (req, res, next) => {
  Course.findById(req.params.id)
    .then(handle404)
    .then(cart => {
      requireOwnership(req, cart)
      cart.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
