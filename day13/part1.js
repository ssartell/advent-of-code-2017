var R = require('ramda');

var readLine = R.pipe(R.trim, R.split(': '), R.map(parseInt));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var severity = (depth, range) => depth % (range * 2 - 2) === 0 ? depth * range : 0;

var solution = R.pipe(parseInput, R.map(R.apply(severity)), R.sum);

module.exports = solution;