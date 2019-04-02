var express = require('express');
const mongo = require('../database/mongo.js');

var router = express.Router();

// call '/restaurant'
router.get('/', function(req, res) {
    res.render('index', { title: '/restaurant' });
});

// call '/restaurant/:id/categories'
router.get('/:id/categories', async function(req, res) {
    const id = req.params.id;
    await mongo.connectToMongo();

    const restaurant = await mongo.findOneById(id, 'restaurant');
    
    await mongo.closeConnection();

    // Validating the restaurant id
    if (restaurant) {
        console.log('found restaurant: ' + JSON.stringify(restaurant));
        res.send(restaurant);
    } else {
        console.log('there is no restaurant with such id: ' + id);
        res.status(404).send();
    }
});

module.exports = router;
