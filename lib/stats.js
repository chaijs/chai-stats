var calc = require('./calc');

module.exports = function (chai, _) {

  _.addProperty(chai.Assertion, 'sum', function () {
    var obj = _.flag(this, 'object');
    new chai.Assertion(obj).to.be.instanceOf(Array);
    _.flag(this, 'object', calc.sum(obj));
  });

  _.addProperty(chai.Assertion, 'mean', function () {
    var obj = _.flag(this, 'object');
    new chai.Assertion(obj).to.be.instanceOf(Array);
    _.flag(this, 'object', calc.mean(obj));
  });

  function deviation () {
    var obj = _.flag(this, 'object');
    new chai.Assertion(obj).to.be.instanceOf(Array);
    _.flag(this, 'object', calc.sdeviation(obj));
  }

  _.addProperty(chai.Assertion, 'stdev', deviation);
  _.addProperty(chai.Assertion, 'deviation', deviation);

};
