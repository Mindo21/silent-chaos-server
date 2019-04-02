var express = require('express');
const mongo = require('../database/mongo.js');

var router = express.Router();

// call '/restaurant'
router.get('/', function(req, res) {
    res.render('index', { title: '/restaurant' });
});

// call '/restaurant/:id'
router.get('/:id', getRestaurantById);

// call '/restaurant/:id/categories'
router.get('/:id/categories', getCategoriesByRestaurantId);

async function getRestaurantById(req, res) {
    const id = req.params.id;

    await mongo.connectToMongo();
    const restaurant = await mongo.findOneById(id, 'restaurant');
    await mongo.closeConnection();

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

    await mongo.connectToMongo();
    const restaurant = await mongo.findOneById(id, 'restaurant');

    // Validating the restaurant id
    if (restaurant) {
        const categories = await mongo.findAllByRestaurantId(id, 'category');
        await mongo.closeConnection();
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
        await mongo.closeConnection();
        res.status(404).send();
    }
}

module.exports = router;
