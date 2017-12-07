var R = require('ramda');

var lineRegex = /(\w*) \((\d*)\)(?: -> (.*))?/;
var trySplit = x => x !== undefined ? R.split(', ', x) : x;
var readLine = R.pipe(R.match(lineRegex), R.tail, R.adjust(parseInt, 1), R.adjust(trySplit, 2));
var parseInput = R.pipe(R.split('\n'), R.map(readLine));

var getNode = R.curry((list, name) => R.find(x => x[0] === name, list));

var getWeights = R.curry((list, node) => {
    if (node[2] === undefined) return node[1];
    var children = R.map(getNode(list), node[2]);
    var weights = R.map(getWeights(list), children);
    if (R.uniq(weights).length > 1) {
        debugger;
        // this ths the part where I'm trash and just copied the value from the watch variables
    }
    return R.sum(weights) + node[1];
});

var findImbalance = list => {
    var programs = R.map(R.head, list);
    var children = R.flatten(R.map(x => x[2], list));
    var rootName = R.without(children, programs)[0];

    var root = getNode(list, rootName);
    return getWeights(list, root);
}

var solution = R.pipe(parseInput, findImbalance);

module.exports = solution;