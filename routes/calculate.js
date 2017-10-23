const express = require('express');
const router = express.Router();

const pug = require('pug');
const _ = require('lodash');
const object = require('lodash/fp/object');

function RepCalculator(data) {
  this.calculateMaxes = function() {

  };

  this.calculateProgram = function(maxes) {

  };
}

// calculates 1rm maxes
router.post('/', function(req, res, next) {
  let maxes = { bench: null, squat: null, overhead: null, deadlift: null };
  let program = { bench: [], squat: [], overhead: [], deadlift: [] };
  let responseMarkup = "";

  // The body should only contain the values for the 4 main lifts, so we should
  // be able to just iterate over the individual properties.
  _.forOwn(req.body, function(value, key) {
    if (value != null && value > 0) {
      value = parseFloat(value);

      // formula: 1rm = w(1 + r/30), assuming r > 1
      maxes[key] = Math.round(value * (1 + (1.0/30.0)));

      // then round to the nearest multiple of 5 for easy plate math
      maxes[key] = Math.ceil(maxes[key]/5)*5;
    }
  });

  // The program will produce 4 weeks worth of sets/reps in a format that looks like this:
  // { b: [max*0.65, max*0.75, max*0.85], [max*0.70, max*0.80, max*0.90], [max*0.75, max*0.85, max*0.95], [max*0.40, max*0.50, max*0.60] }
  // where each array contains a weight as a percentage of calculated max

  _.forOwn(maxes, function(value, key) {
    value = parseFloat(value);

    program[key] = [
      [[5, 5, 5], [3, 3, 3], [5, 3, 1], [5, 5, 5]],
      [value * 0.65, value * 0.75, value * 0.85],
      [value * 0.70, value * 0.80, value * 0.90],
      [value * 0.75, value * 0.85, value * 0.95],
      [value * 0.40, value * 0.50, value * 0.60],
    ];
  });

  console.log(program);

  responseMarkup = pug.renderFile('./views/max_results.pug', maxes);
  res.send(responseMarkup);
});

module.exports = router;