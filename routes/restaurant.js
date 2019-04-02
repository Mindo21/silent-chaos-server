var express = require('express');
const mongo = require('../database/mongo.js');

var router = express.Router();

// call '/restaurant'
router.get('/', function(req, res) {
    res.render('index', { title: '/restaurant' });
});

// call '/restaurant/:id/categories'
router.get('/:id/categories', function(req, res) {
    const id = req.params.id;
    mongo.connectToMongo();

    mongo.closeConnection();
    res.render('index', { title: '/restaurant/' + id + '/categories' });
});

module.exports = router;
