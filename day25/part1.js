var R = require('ramda');

var parseInput = R.pipe(R.trim);
var checksumSteps = 12964419;

var run = () => {
    var tape = {};
    
    var cursor = 0;
    var state = 'A';
    for(var i = 0; i < checksumSteps; i++) {
        var value = tape[cursor] || 0;
        if (state === 'A') {
            if (value === 0) {
                tape[cursor] = 1;
                cursor++;
                state = 'B';
            } else {
                tape[cursor] = 0;
                cursor++;
                state = 'F';
            }
        } else if (state === 'B') {
            if (value === 0) {
                tape[cursor] = 0;
                cursor--;
                state = 'B';
            } else {
                tape[cursor] = 1;
                cursor--;
                state = 'C';
            }
        } else if (state === 'C') {
            if (value === 0) {
                tape[cursor] = 1;
                cursor--;
                state = 'D';
            } else {
                tape[cursor] = 0;
                cursor++;
                state = 'C';
            }
        } else if (state === 'D') {
            if (value === 0) {
                tape[cursor] = 1;
                cursor--;
                state = 'E';
            } else {
                tape[cursor] = 1;
                cursor++;
                state = 'A';
            }
        } else if (state === 'E') {
            if (value === 0) {
                tape[cursor] = 1;
                cursor--;
                state = 'F';
            } else {
                tape[cursor] = 0;
                cursor--;
                state = 'D';
            }
        } else if (state === 'F') {
            if (value === 0) {
                tape[cursor] = 1;
                cursor++;
                state = 'A';
            } else {
                tape[cursor] = 0;
                cursor--;
                state = 'E';
            }
        }
    }

    return R.pipe(R.values, R.sum)(tape);
}

var solution = R.pipe(parseInput, run);

module.exports = solution;