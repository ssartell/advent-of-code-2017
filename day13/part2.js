var R = require('ramda');

var pos = R.curry((depth, range, t) => Math.abs((range - 1) - ((depth + t + (range - 1)) % ((range - 1) * 2))));

var readLine = R.pipe(R.trim, R.split(': '), R.map(parseInt), R.apply(pos));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var run = fs => {
    var t = 0;
    while (R.any(f => f(t) === 0, fs)) t++;
    return t;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;