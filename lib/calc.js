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
