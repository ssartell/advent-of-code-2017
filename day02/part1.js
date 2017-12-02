var R = require('ramda');

var parseInput = R.pipe( R.split('\n'), R.map(R.pipe(R.split('\t'), R.map(parseInt))));
var min = R.reduce(R.min, Infinity);
var max = R.reduce(R.max, -Infinity);
var maxMinusMin = list => max(list) - min(list);

var solution = R.pipe(parseInput, R.map(maxMinusMin), R.sum);

module.exports = solution;