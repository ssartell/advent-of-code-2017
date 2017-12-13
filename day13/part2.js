var R = require('ramda');

var pos = R.curry((depth, range, t) => Math.abs((range - 1) - ((depth + t + (range - 1)) % ((range - 1) * 2))));

var readLine = R.pipe(R.trim, R.split(': '), R.map(parseInt), R.apply(pos));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var run = fs => {
    var i = 0;
    while (R.any(x => x(i) === 0, fs)) i++;
    return i;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;