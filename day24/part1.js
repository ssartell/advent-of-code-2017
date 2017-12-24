var R = require('ramda');
var Queue = require('mnemonist/queue');

var readLine = R.pipe(R.trim, R.split('/'), R.map(parseInt), R.zipObj(['l', 'r']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var maxBridge = (r, components) => {
    var validComponents = R.filter(x => x.l === r || x.r === r, components);
    if (validComponents.length === 0) return 0;
    return R.reduce((a, x) => R.max(a, x.l + x.r + maxBridge(x.l === r ? x.r : x.l, R.without([x], components))), 0, validComponents)
}

var run = components => {
    return maxBridge(0, components);
}

var solution = R.pipe(parseInput, run);

module.exports = solution;