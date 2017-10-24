'use strict';

const _ = require('lodash');
const BasicMathService = require('../services/basicMathService');

class CalculatorService {
  static calculateOneRepMax(rep_obj) {
    let maxes = { bench: null, squat: null, overhead: null, deadlift: null };

    // The body should only contain the values for the 4 main lifts, so we should
    // be able to just iterate over the individual properties.
    _.forOwn(rep_obj, function(value, key) {
      if (value != null && value > 0) {

        maxes[key] = BasicMathService.calculateOneRepMax(value);
        maxes[key] = BasicMathService.roundToNearestFive(maxes[key]);
      }
    });

    return maxes;
  }

  static calculateFourWeekProgram(maxes) {
    let program = { bench: [], squat: [], overhead: [], deadlift: [] };

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

    return program;
  }
}

module.exports = CalculatorService;