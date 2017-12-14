var R = require('ramda');
var knot = require('../day10/part2');

var debug = x => {debugger; return x;}

var toHashes = x => R.map(y => knot(`${x}-${y}`), R.range(0, 128));
var parseInput = R.pipe(R.trim, toHashes);

var pad = n => ("000" + n).substr(-4);
var hexToBinary = x => pad(parseInt(x, 16).toString(2));

var solution = R.pipe(parseInput, R.map(R.map(hexToBinary)), R.map(R.pipe(R.map(R.pipe(R.map(parseInt), R.sum)), R.sum)), R.sum);

module.exports = solution;