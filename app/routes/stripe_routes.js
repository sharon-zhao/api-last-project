// const express = require('express')
// const router = express.Router()
//
// router.post('/pay-course', (req, res, next) => {
//   const charge = req.body.charge
//   const stripe = require('stripe')('sk_test_51GwtbWItoru9tJqqJpxnov9vsiSPKVxI5TtnH3bG3tetqRgX7MhQBYPzJd9LKgayKpTnT1lUcDK5bOEdQ1VUYRyb00hSEAuBlK')
//   stripe.charges.create({
//     amount: charge.amount,
//     currency: 'usd',
//     payment_method: id,
//     confirm: true
//   })
//     .then(card => res.status(201).json({ charge: charge }))
//     .catch(next)
// })
