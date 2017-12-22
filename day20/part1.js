
var R = require('ramda');

var debug = x => {debugger; return x;};

var lineRegex = /p=<(-?\d*),(-?\d*),(-?\d*)>, v=<(-?\d*),(-?\d*),(-?\d*)>, a=<(-?\d*),(-?\d*),(-?\d*)>/;
var readLine = R.pipe(R.trim, R.match(lineRegex), R.tail, R.splitEvery(3), R.zipObj(['p', 'v', 'a']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var dist = R.pipe(R.map(Math.abs), R.sum);
var closest = R.addIndex(R.reduce)((a, x, i) => dist(x.a) < a.dist ? { dist: dist(x.a), i: i } : a, { i: -1, dist: Infinity});

var solution = R.pipe(parseInput, closest, R.prop('i'));

module.exports = solution;