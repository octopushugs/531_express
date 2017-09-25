const express = require('express');
const router = express.Router();

const pug = require('pug');
const _ = require('lodash');
const object = require('lodash/fp/object');

// calculates 1rm maxes
router.post('/', function(req, res, next) {
  let maxes = { b: null, s: null, o: null, d: null };
  let responseMarkup = "";

  // The body should only contain the values for the 4 main lifts, so we should
  // be able to just iterate over the individual properties.
  _.forOwn(req.body, function(value, key) {
    if (value != null && value > 0) {
      value = parseFloat(value);

      // formula: 1rm = w(1 + r/30), assuming r > 1
      maxes[key] = Math.round(value * (1 + (1.0/30.0)));

      // then round to the nearest multiple of 2.5 for easy plate math
      maxes[key] = Math.ceil(maxes[key]/2.5)*2.5;
    }
  });

  responseMarkup = pug.renderFile('./views/max_results.pug', maxes);
  res.send(responseMarkup);
});

module.exports = router;