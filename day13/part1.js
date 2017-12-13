var R = require('ramda');

var pos = (depth, range) =>  Math.abs((range - 1) - ((depth + (range - 1)) % ((range - 1) * 2))) === 0 ? depth * range : 0;

var readLine = R.pipe(R.trim, R.split(': '), R.map(parseInt), R.apply(pos));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var solution = R.pipe(parseInput, R.sum);

module.exports = solution;