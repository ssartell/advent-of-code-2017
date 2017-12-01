var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(''), R.map(parseInt));

var mod = (a, b) => a % b;
var matchesNextDigit = R.curry((list, x, i) => list[mod(i + 1, list.length)] == x);
var filterWithIndex = R.curry(function*(f, list) {
    for(var i = 0; i < list.length; i++) {
        var x = list[i];
        if (f(x, i)) yield x;
    }
});

var getDigitsWithMatch = (list) => filterWithIndex(matchesNextDigit(list))(list);

var solution = R.pipe(parseInput, getDigitsWithMatch, R.sum);

module.exports = solution;