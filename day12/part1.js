var R = require('ramda');

var readLine = R.pipe(R.trim, R.split(' <-> '), R.adjust(R.split(', '), 1))
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine), R.transpose, R.apply(R.zipObj));

var countAll = R.curry((seen, current, progs) => {
    seen[current] = true;
    return R.reduce((a, x) => seen[x] ? a : countAll(seen, x, progs), 1, progs[current]);
});

var solution = R.pipe(parseInput, countAll({}, 0));

module.exports = solution;