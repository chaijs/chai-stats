!function (name, definition) {
  if (typeof define == 'function' && typeof define.amd  == 'object') define(definition);
  else this[name] = definition();
}('chai_stats', function () {
  // CommonJS require()
  function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }

  require.modules = {};

  require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };

  require.register = function (path, fn){
    require.modules[path] = fn;
  };

  require.relative = function (parent) {
    return function(p){
      if ('.' != p[0]) return require(p);

      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();

      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };


require.register("calc", function (module, exports, require) {
/*!
 * Chai Stats - calculation utilities
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licenced
 */

/**
 * # sum
 *
 * Returns the sum of a given array of numbers.
 *
 * @param {Array} numbers to sum
 * @returns sum
 */

exports.sum = function (nums) {
  var res = 0;
  for (var i = 0; i < nums.length; i++)
    res += nums[i];
  return res;
};

/**
 * # mean
 *
 * Returns the mean (average) of a given array of numbers.
 *
 * @param {Array} numbers to average
 * @returs mean
 */

exports.mean = function (nums) {
  var sum = exports.sum(nums);
  return sum / nums.length;
};

/**
 * # sdeviation
 *
 * Returns the standard deviation of a given array of numbers.
 *
 * @param {Array} numbers for stdev
 * @return standard deviation
 */

exports.sdeviation = function (nums) {
  var devs = []
    , mean = exports.mean(nums);
  for (var i = 0; i < nums.length; i++)
    devs.push(nums[i] - mean);
  for (var d = 0; d < devs.length; d++)
    devs[d] = Math.pow(devs[d], 2);
  var davg = exports.sum(devs) / (devs.length - 1);
  return Math.sqrt(davg);
};

}); // module calc


require.register("stats", function (module, exports, require) {
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

}); // module stats
  return require('stats');
});

chai.use(chai_stats);
