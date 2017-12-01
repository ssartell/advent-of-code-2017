var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(''), R.map(parseInt));

var mod = (a, b) => a % b;
var matchesHalfwayDigit = R.curry((list, x, i) => list[mod(i + list.length / 2, list.length)] == x);
var filterWithIndex = R.curry(function*(f, list) {
    for(var i = 0; i < list.length; i++) {
        var x = list[i];
        if (f(x, i)) yield x;
    }
});

var getDigitsWithMatch = (list) => filterWithIndex(matchesHalfwayDigit(list))(list);

var solution = R.pipe(parseInput, getDigitsWithMatch, R.sum);

module.exports = solution;