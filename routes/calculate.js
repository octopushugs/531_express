const express = require('express');
const router = express.Router();

const pug = require('pug');
const _ = require('lodash');
const object = require('lodash/fp/object');

// Custom services
const CalculatorService = require('../services/calculatorService');

router.post('/', function(req, res, next) {
  let responseMarkup = "";

  let maxes = CalculatorService.calculateOneRepMax(req.body);
  let program = CalculatorService.calculateFourWeekProgram(maxes);

  console.log(program);

  responseMarkup = pug.renderFile('./views/max_results.pug', maxes);
  res.send(responseMarkup);
});

module.exports = router;