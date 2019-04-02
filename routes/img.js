var express = require('express');
const path = require("path");
var router = express.Router();

// call '/img'
router.get('/', function(req, res, next) {
  res.render('index', { title: '/img' });
});

router.get('/categories/:imageName', getCategoryImage);

function getCategoryImage(req, res) {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, "../img/categories/" + imageName + ".jpg"));
}

module.exports = router;
