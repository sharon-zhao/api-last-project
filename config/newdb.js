const { MongoClient } = require('mongodb');
const fs = require('fs');

const credentials = fs.readFileSync('<path_to_certificate>');

const client = new MongoClient('mongodb+srv://sharon:<pw>-@cluster0.tw9s5.mongodb.net/testDB?retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials
});

async function run() {
  try {
    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
