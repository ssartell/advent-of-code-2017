var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(','));

var dirs = {
    n: [1, 0, -1],
    s: [-1, 0, 1],
    ne: [1, -1, 0],
    sw: [-1, 1, 0],
    nw: [0, 1, -1],
    se: [0, -1, 1],
};

var add = (a, b) => R.map(R.sum, R.zip(a, b));
var dist = R.curry((a, b) => (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])) / 2);
var step = (pos, dir) => add(pos, dirs[dir]);

var solution = R.pipe(parseInput, R.reduce(step, [0, 0, 0]), dist([0, 0, 0]));

module.exports = solution;