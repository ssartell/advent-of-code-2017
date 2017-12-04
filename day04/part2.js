var R = require('ramda');
var C = require('js-combinatorics');

var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.trim, R.split(' '))));

var isNotAnagram = R.pipe(R.map(R.pipe(R.split(''), R.sortBy(R.identity), R.join(''))), x => x[0] !== x[1]);
var isValid = R.pipe(x => C.combination(x, 2).toArray(), R.all(isNotAnagram));

var solution = R.pipe(parseInput, R.map(isValid), R.filter(R.identity), R.prop('length'));

module.exports = solution; 