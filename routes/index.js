var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '531_Express',
    subtitle: 'A Node/Express 5/3/1 workout calculator'
  });
});

module.exports = router;
