var R = require('ramda');

var parseInput = R.pipe(R.split('\t'), R.map(parseInt));

var redistribute = mem => {
    var max = R.reduce(R.max, -Infinity, mem);
    var i = R.indexOf(max, mem);
    var blocks = mem[i];
    mem[i] = 0;
    while(blocks > 0) {
        i = (i + 1) % mem.length;
        mem[i]++;
        blocks--;
    }
};

var hasSeenState = (states, mem) => {
    var curr = R.join(',', mem);
    if (states[curr]) {
        return true;
    } else {
        states[curr] = true;
        return false;
    }
};

var countCyclesUntilRepeat = mem => {
    var states = {};
    var cycles = 0;

    while(!hasSeenState(states, mem)) {
        redistribute(mem);
        cycles++;
    }

    return cycles;
};

var solution = R.pipe(parseInput, countCyclesUntilRepeat);

module.exports = solution;