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

  _.addProperty(chai.Assertion, 'almost', function () {
    _.flag(this, 'almost', true);
  });

  /**
   * # .equal(expected, [precision])
   *
   * Overwrites Chai's `equal` if flagged with `almost`.
   *
   * The same as NumPy's assert_almost_equal, for scalars.
   * Assert near equality: abs(expected-actual) < 0.5 * 10**(-decimal)
   *
   *      expect(3.1415).to.almost.equal(3.14159, 3);
   *      assert.almostEqual(3.1416, 3.14159, 3, 'these numbers are almost equal');
   *
   * @name equal
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} decimal
   * @param {String} message
   * @api public
   */

  _.overwriteMethod(chai.Assertion, 'equal', function(_super) {
    return function equal (exp, precision) {
      if (_.flag(this, 'almost')) {
        var act = _.flag(this, 'object')
        if (null == precision) precision = 7;
        this.assert(
            Math.abs(act - exp) < 0.5 * Math.pow(10, -precision)
          , "expected #{this} to equal #{exp} up to " + _.inspect(precision) + " decimal places"
          , "expected #{this} to not equal #{exp} up to " + _.inspect(precision) + " decimal places"
          , exp
          , act
        );
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  _.addMethod(chai.assert, 'almostEqual', function (act, exp, precision, msg) {
    new chai.Assertion(act, msg).to.almost.equal(exp, precision);
  });

  /**
   * # .deepAlmostEqual(actual, expected, [decimal, message])
   *
   * The same as NumPy's assert_almost_equal, for objects whose leaves are all numbers.
   * Assert near equality: abs(expected-actual) < 0.5 * 10**(-decimal) for every leaf
   *
   *      assert.deepAlmostEqual({pi: 3.1416}, {pi: 3.14159}, 3);
   *
   * @name equal
   * @param {*} actual
   * @param {*} expected
   * @param {Number} decimal
   * @param {String} message
   * @api public
   */

  _.overwriteMethod(chai.Assertion, 'eql', function (_super) {
    return function eql (exp, precision) {
      if (_.flag(this, 'almost')) {
        if (null == precision) precision = 7;
        var act = _.flag(this, 'object')
          , tol = 0.5 * Math.pow(10, -precision);

        function deepEql (act, exp) {
          if (Object(act) === act){
            for (var k in act) {
              if (!(deepEql(act[k], exp[k]))) {
                return false;
              }
            }
            return true;
          } else {
            return Math.abs(act - exp) < tol;
          }
        };

        this.assert(
            deepEql(act, exp)
          , "expected #{this} to equal #{exp} up to " + _.inspect(precision) + ' decimal places'
          , "expected #{this} to not equal #{exp} up to " + _.inspect(precision) + ' decimal places'
          , exp
          , act
        );
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  _.addMethod(chai.assert, 'deepAlmostEqual', function (act, exp, precision, msg) {
    new chai.Assertion(act, msg).to.almost.eql(exp, precision);
  });
};
