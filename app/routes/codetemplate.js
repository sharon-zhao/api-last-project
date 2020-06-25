// import Stripe from 'stripe'
//
// const stripe = new Stripe('sk_test_51GwtbWItoru9tJqqJpxnov9vsiSPKVxI5TtnH3bG3tetqRgX7MhQBYPzJd9LKgayKpTnT1lUcDK5bOEdQ1VUYRyb00hSEAuBlK')
//
// export default async (req, res) => {
//   const { id, amount } = req.body
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: 'USD',
//       description: 'course',
//       payment_method: id,
//       confirm: true
//     })
//     return res.status(200).json({ 200 })
//   } catch (error) {
//     return res.status(400).json({
//       message:'error.message
//     })
//   }
// }
