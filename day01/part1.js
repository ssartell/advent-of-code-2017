var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(''), R.map(parseInt));

var matchesNextDigit = (x, i, list) => list[(i + 1) % list.length] == x;
var filterWithIndex = R.curry(function*(f, list) {
    for(var i = 0; i < list.length; i++) {
        var x = list[i];
        if (f(x, i, list)) yield x;
    }
});

var getDigitsWithMatch = filterWithIndex(matchesNextDigit);

var solution = R.pipe(parseInput, getDigitsWithMatch, R.sum);

module.exports = solution;