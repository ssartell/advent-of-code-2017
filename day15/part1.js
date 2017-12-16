var R = require('ramda');

var readLine = R.pipe(R.split(' '), R.last, parseInt);
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var getVal = (lastVal, gen) => lastVal * gen.factor % 2147483647;
var getBits = val => 65535 & val;

var run = starters => {
    var valA = starters[0];
    var genA = {
        factor: 16807
    };

    var valB = starters[1];
    var genB = {
        factor: 48271
    };

    var count = 0;
    for(var i = 1; i < 40000000; i++) {
        valA = getVal(valA, genA);
        valB = getVal(valB, genB);
        if (getBits(valA) === getBits(valB)) count++;
    }

    return count;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;