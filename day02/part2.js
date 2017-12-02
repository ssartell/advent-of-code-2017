var R = require('ramda');
var C = require('js-combinatorics');

var parseInput = R.pipe(R.split('\n'), R.map(R.pipe(R.split('\t'), R.map(parseInt))));

var isDivisible = (a, b) => a != b && a % b === 0;
var expandCombos = x => C.cartesianProduct(x, x);
var findDivision = R.pipe(expandCombos, R.find(R.apply(isDivisible)), R.apply(R.divide));

var solution = R.pipe(parseInput, R.map(findDivision), R.sum);

module.exports = solution;