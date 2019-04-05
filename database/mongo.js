const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const config = require('../config.js');
const url = config.MONGO_URL;
const dbName = config.DB_NAME;

let db;
let connected = false;

const client = new MongoClient(url, { useNewUrlParser: true });

async function connectToMongo() {
    console.log("Connecting to mongo...");

    await client.connect();
    console.log("Connected to mongo!");
    db = client.db(dbName);
    connected = true;
}

async function closeConnection() {
    await client.close();
    connected = false;
}

async function makeSureMongoIsConnected() {
    if (!connected)
        // Establish connection
        await connectToMongo();
}

function isConnected() {
    return connected;
}

// ---------------------------- FIND ------------------------------

async function findOneById(idName, collectionName) {
    makeSureMongoIsConnected();

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
    makeSureMongoIsConnected();

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
    makeSureMongoIsConnected();

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

// --------------------------- INSERT -----------------------------

async function insertOne(doc, collectionName) {
    makeSureMongoIsConnected();

    let result = null;
    const collection = db.collection(collectionName);

    try {
        result = await collection.insertOne(doc);
        console.log("One " + collectionName + " inserted into database.");
    } catch(err) {
        console.error(err);
    } finally {
        return result;
    }
}

module.exports = {
    isConnected: isConnected,
    findOneById: findOneById,
    findAllById: findAllById,
    findAllByRestaurantId: findAllByRestaurantId,
    insertOne: insertOne,
};