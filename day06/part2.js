var R = require('ramda');

var parseInput = R.pipe(R.split('\t'), R.map(parseInt));

var getState = R.join(',');
var hasSeenState = (states, mem, cycles) => {
    var curr = getState(mem);
    if (states[curr] !== undefined) {
        return true;
    } else {
        states[curr] = cycles;
        return false;
    }
};

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

var countCyclesUntilRepeat = mem => {
    var states = {};
    var cycles = 0;

    while(!hasSeenState(states, mem, cycles)) {
        redistribute(mem);
        cycles++;
    }

    return cycles - states[getState(mem)];
};

var solution = R.pipe(parseInput, countCyclesUntilRepeat);

module.exports = solution;