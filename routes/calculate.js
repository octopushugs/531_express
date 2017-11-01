const express = require('express');
const router = express.Router();

const pug = require('pug');
const _ = require('lodash');
const object = require('lodash/fp/object');

// Custom services
const CalculatorService = require('../services/calculatorService');

router.post('/', function(req, res, next) {
  // while this kind of logic would normally be included in a controller, I'm opting for here
  // because there is no model layer to interact with. It seemed like overkill to include anything more
  // than CalculatorService
  let responseMarkup = "";

  let maxes = CalculatorService.calculateOneRepMax(req.body);
  let program = CalculatorService.calculateFourWeekProgram(maxes);

  console.log(program);

  responseMarkup = pug.renderFile('./views/max_results.pug', maxes);
  res.send(responseMarkup);
});

module.exports = router;