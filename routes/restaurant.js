var express = require('express');
const mongo = require('../database/mongo.js');

var router = express.Router();

// call '/restaurant'
router.get('/', function(req, res) {
    mongo.connectAndInsert();
    res.render('index', { title: '/restaurant' });
});

module.exports = router;
