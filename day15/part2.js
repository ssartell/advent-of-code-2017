var R = require('ramda');

var readLine = R.pipe(R.split(' '), R.last, parseInt);
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var getVal = (lastVal, gen) => lastVal * gen.factor % gen.div;
var getBits = val => (65535 & val).toString(2);

var run = starters => {
    var valA = starters[0];
    var genA = {
        factor: 16807,
        div: 2147483647
    };

    var valB = starters[1];
    var genB = {
        factor: 48271,
        div: 2147483647
    };

    var count = 0;
    for(var i = 1; i < 5000000; i++) {
        do {
            valA = getVal(valA, genA);
        } while(valA % 4 !== 0)

        do {
            valB = getVal(valB, genB);
        } while(valB % 8 !== 0)

        if (getBits(valA) === getBits(valB)) count++;
    }

    return count;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;