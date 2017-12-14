var R = require('ramda');

var readLine = R.pipe(R.trim, R.split(': '), R.map(parseInt), R.zipObj(['depth', 'range']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var pos = (depth, range, t) => (t + depth) % (range * 2 - 2);

var run = scanners => {
    var t = 0;
    while (R.any(s => pos(s.depth, s.range, t) === 0, scanners))
        t++;
    return t;
};

var solution = R.pipe(parseInput, run);

module.exports = solution;