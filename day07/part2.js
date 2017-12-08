var R = require('ramda');

var lineRegex = /(\w*) \((\d*)\)(?: -> (.*))?/;
var trySplit = x => x ? R.split(', ', x) : [];
var readLine = R.pipe(R.match(lineRegex), R.tail, R.zipObj(['name', 'weight', 'children']), R.evolve({ weight: parseInt, children: trySplit }));
var asLookup = R.chain(R.zipObj, R.map(R.prop('name')));
var parseInput = R.pipe(R.split('\n'), R.map(readLine), asLookup);

var getWeight = R.memoizeWith(R.prop('name'), node => {
    if (R.isEmpty(node.children)) return node.weight;
    var weights = R.map(getWeight, node.children);
    return R.sum(weights) + node.weight;
});

var toTree = (programs) => {
    var allPrograms = R.keys(programs);
    var children = R.flatten(R.pluck('children', R.values(programs)));
    var rootName = R.without(children, allPrograms)[0];
    R.forEach(x => x.children = R.map(y => programs[y], x.children), R.values(programs));
    return programs[rootName];
};

var rebalance = node => {
    if (R.isEmpty(node.children)) return 0;

    var childrenBalance = R.map(rebalance, node.children);
    var max = R.reduce(R.max, -Infinity, childrenBalance);
    if (max > 0) return max;

    var weightSets = R.groupBy(getWeight, node.children);
    var sortedSets = R.sortBy(x => x.length, R.values(weightSets));
    if (sortedSets.length === 1) return 0;
    return sortedSets[0][0].weight - (getWeight(sortedSets[0][0]) - getWeight(sortedSets[1][0]));   
}

var findImbalance = programs => {
    var root = toTree(programs);
    return rebalance(root);
};

var solution = R.pipe(parseInput, findImbalance);

module.exports = solution;