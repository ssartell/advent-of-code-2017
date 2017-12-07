var R = require('ramda');

var debug = x => {debugger; return x;}

var lineRegex = /(\w*) \((\d*)\)(?: -> (.*))?/;
var trySplit = x => x !== undefined ? R.split(', ', x) : x;
var readLine = R.pipe(R.match(lineRegex), R.tail, R.adjust(parseInt, 1), R.adjust(trySplit, 2));
var parseInput = R.pipe(R.split('\n'), R.map(readLine));

var getBottom = list => {
    var programs = R.map(R.head, list);
    var children = R.flatten(R.map(x => x[2], list));
    return R.without(children, programs)[0];
}

var solution = R.pipe(parseInput, getBottom);

module.exports = solution;