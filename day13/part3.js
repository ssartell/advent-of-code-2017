var R = require('ramda');

var readLine = R.pipe(R.trim, R.split(': '), R.map(parseInt));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var equation = (depth, range) => `abs(${range - 1}-mod(x+${depth + range - 1},${(range-1)*2}))`;

var solution = R.pipe(parseInput, R.map(R.apply(equation)), R.map(x => console.log(x)));

module.exports = solution;