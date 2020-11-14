// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
const userRoutes = require('./app/routes/user_routes')
const courseRoutes = require('./app/routes/course_routes')
const applicationRoutes = require('./app/routes/application_routes')
const cartRoutes = require('./app/routes/cart_routes')
const displayRoutes = require('./app/routes/display_routes')
// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')
const stripeRoutes = require('./app/routes/stripe_routes')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://heroku_9gj75wqx:<password>@cluster-9gj75wqx.coxpc.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
app.use(userRoutes)
app.use(applicationRoutes)

app.use(courseRoutes)

app.use(cartRoutes)

app.use(displayRoutes)

app.use(stripeRoutes)
// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
