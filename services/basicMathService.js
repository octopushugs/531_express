'use strict';

class BasicMathService {
  static roundToNearestFive(num) {
    // then round to the nearest multiple of 5 for easy plate math
    return Math.ceil(num/5)*5;
  }

  static calculateOneRepMax(num) {
    num = parseFloat(num);

    // formula: 1rm = w(1 + r/30), assuming r > 1
    return Math.round(num * (1 + (1.0/30.0)));
  }
}

module.exports = BasicMathService;