if (!chai) {
  var chai = require('chai')
    , stats = require('..');
  chai.use(stats);
}

var should = chai.should();

describe('Chai Stats', function () {

  describe('Math Basics', function () {
    var nums = [ 1, 3, 5, 7, 9, ];

    it('should be able to get the sum of a set of numbers', function () {
      nums.should.have.sum.equal(25);
    });

    it('should be able to get the mean of a set of numbers', function () {
      nums.should.have.mean.equal(5);
    });

    it('should be able to get the standard deviation', function () {
      nums.should.have.stdev.equal(3.1622776601683795);
      nums.should.have.deviation.equal(3.1622776601683795);
    });
  });
});
