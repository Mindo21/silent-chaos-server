const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
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

async function connectToMongo() {
    console.log("Connecting to mongo...");

    await client.connect();
    console.log("Connected to mongo!");
    db = client.db(dbName);
    isConnected = true;
}

async function closeConnection() {
    await client.close();
    isConnected = false;
}

async function findOneById(idName, collectionName) {
    // Validating connection
    if (!isConnected) {
        console.error("Error: Mongo operation before establishing connection!");
        return null;
    }

    let result = null;
    const id = new ObjectId(idName);
    const collection = db.collection(collectionName);
    const query = { '_id' : id };

    try {
        result = await collection.findOne(query);
    } catch(err) {
        console.error(err);
    } finally {
        return result;
    }
}

async function findAllById(idName, collectionName) {
    // Validating connection
    if (!isConnected) {
        console.error("Error: Mongo operation before establishing connection!");
        return null;
    }

    let result = null;
    const id = new ObjectId(idName);
    const collection = db.collection(collectionName);
    const query = { '_id' : id };

    try {
        result = await collection.find(query).toArray();
    } catch(err) {
        console.error(err);
    } finally {
        return result;
    }
}

async function findAllByRestaurantId(restaurantIdName, collectionName) {
    // Validating connection
    if (!isConnected) {
        console.error("Error: Mongo operation before establishing connection!");
        return null;
    }

    let result = null;
    const restaurantId = new ObjectId(restaurantIdName);
    const collection = db.collection(collectionName);
    const query = { 'restaurant_id' : restaurantId };

    try {
        result = await collection.find(query).toArray();
    } catch(err) {
        console.error(err);
    } finally {
        return result;
    }
}


module.exports = {
    connectToMongo: connectToMongo,
    closeConnection: closeConnection,
    findOneById: findOneById,
    findAllById: findAllById,
    findAllByRestaurantId: findAllByRestaurantId,
    isConnected: isConnected,
};