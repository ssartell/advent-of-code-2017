var R = require('ramda');

var debug = x => {debugger; return x;};
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.trim, R.split(' '))));

var isValid = R.pipe(R.groupBy(R.identity), R.values, R.all(x => x.length === 1));
var solution = R.pipe(parseInput, R.map(isValid), R.filter(R.identity), R.prop('length'));

module.exports = solution;