var express = require('express');
const mongo = require('../database/mongo.js');

var router = express.Router();

// -------------------------- GET requests --------------------

// call GET '/restaurant'
router.get('/', function(req, res) {
    res.render('index', { title: '/restaurant' });
});

// call GET '/restaurant/:id'
router.get('/:id', getRestaurantById);

// call GET '/restaurant/:id/categories'
router.get('/:id/categories', getCategoriesByRestaurantId);

// call GET '/restaurant/:id/tables'
router.get('/:id/tables', getTablesByRestaurantId);


// ------------------------ POST requests ---------------------

// call POST '/restaurant'
router.post('/', insertNewRestaurant);


// ---------------------- Functions needed --------------------

async function getRestaurantById(req, res) {
    const id = req.params.id;
    const restaurant = await mongo.findOneById(id, 'restaurant');

    // Validating the restaurant id
    if (restaurant) {
        console.log('found restaurant: ' + JSON.stringify(restaurant));
        res.send(restaurant);
    } else {
        console.log('there is no restaurant with this id: ' + id);
        res.status(404).send();
    }
}

async function getCategoriesByRestaurantId(req, res) {
    const id = req.params.id;
    const restaurant = await mongo.findOneById(id, 'restaurant');

    // Validating the restaurant id
    if (restaurant) {
        const categories = await mongo.findAllByRestaurantId(id, 'category');
        if (categories) {
            console.log('found restaurant: ' + JSON.stringify(restaurant));
            console.log('found categories: ' + categories.toString());
            res.send(categories);
        } else {
            console.log('there are no categories in this restaurant: ' + JSON.stringify(restaurant));
            res.status(404).send();
        }
    } else {
        console.log('there is no restaurant with this id: ' + id);
        res.status(404).send();
    }
}

async function getTablesByRestaurantId(req, res) {
    const id = req.params.id;
    const restaurant = await mongo.findOneById(id, 'restaurant');

    // Validating the restaurant id
    if (restaurant) {
        const tables = await mongo.findAllByRestaurantId(id, 'table');
        if (tables) {
            console.log('found restaurant: ' + JSON.stringify(restaurant));
            console.log('found tables: ' + tables.toString());
            res.send(tables);
        } else {
            console.log('there are no categories in this restaurant: ' + JSON.stringify(restaurant));
            res.status(404).send();
        }
    } else {
        console.log('there is no restaurant with this id: ' + id);
        res.status(404).send();
    }
}

async function insertNewRestaurant(req, res) {
    const restaurant = req.body;

    console.log(JSON.stringify(restaurant));

    const result = await mongo.insertOne(restaurant, 'restaurant');

    console.log(result);

    res.json('User added successfully');
    // res.status(400).send("unable to save to database");
}

module.exports = router;
