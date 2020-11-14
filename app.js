const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db')
// replace the uri string with your connection string.
const uri = "mongodb+srv://heroku_9gj75wqx:Zxr2303811992@cluster-9gj75wqx.coxpc.mongodb.net/<dbname>?retryWrites=true&w=majority";
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
