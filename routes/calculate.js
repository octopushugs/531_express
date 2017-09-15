var express = require('express');
var router = express.Router();

// Calculates data
router.get('/', function(req, res, next) {
  res.json({ requested_at: req.requestTime });
});

module.exports = router;