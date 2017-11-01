// This should test that the methods in basicMathService and calculatorService do what we expect them to.
// Better architecture would be to split them in to their own tests I think, but since this app is simple
// I'd rather go with a single moving part.

const assert = require('assert');
const BasicMathService = require('../services/basicMathService');

describe('BasicMathService', () => {
  describe('#roundToNearestFive', () => {
    it('should return the same as the input when passed a number divisible by 5', function() {
      assert.equal(135, BasicMathService.roundToNearestFive(135));
    });

    it('should return 0 when passed 0', () => {
      assert.equal(0, BasicMathService.roundToNearestFive(0));
    });

    it('should round up to the nearest multiple of 5', () => {
      assert.equal(5, BasicMathService.roundToNearestFive(1));
      assert.equal(15, BasicMathService.roundToNearestFive(11));
    });
  });

  describe('#calculateOneRepMax', () => {
    it('should return a number', () => {
      assert.equal('number', typeof(BasicMathService.calculateOneRepMax(135)));
    });

    it('should accept a float or integer as an argument', () => {
      assert.equal(233, BasicMathService.calculateOneRepMax(225));
      assert.equal(65, BasicMathService.calculateOneRepMax(62.5));
    });
  });
});