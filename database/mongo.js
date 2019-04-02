const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config.js');
const url = config.MONGO_URL;
const dbName = config.DB_NAME;

let db;
let isConnected = false;

const client = new MongoClient(url, { useNewUrlParser: true });

const insertDocuments = function(db) {
    // Get the documents collection
    const collection = db.collection('restaurant');
    // Insert some documents
    collection.insertMany([
      {x : 1}, {y : 2}, {z : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
    });
}

function connectToMongo() {
    console.log("Connecting to mongo...");

    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected to mongo!");

        db = client.db(dbName);

        //insertDocuments(db);
    });

    isConnected = true;
}

function closeConnection() {
    client.close();
    isConnected = false;
}



module.exports = {
    connectToMongo: connectToMongo,
    closeConnection: closeConnection,
    db: db,
    isConnected: isConnected,
};