var R = require('ramda');

var debug = x => {debugger; return x;}

var parseInput = R.pipe(R.split('\n'), R.map(R.split('')));

var allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var add = (a, b) => R.map(R.sum, R.zip(a, b));
var flip = R.map(x => -x);
var findStart = R.pipe(R.head, R.indexOf('|'));
var getChar = (paths, pos) => paths[pos[0]][pos[1]];

var newDir = (paths, pos, dir) => {
    var newDir = R.reverse(dir);
    var char = getChar(paths, add(pos, newDir));
    return char !== ' ' ? newDir : flip(newDir);
};

var run = paths => {
    var pos = [0, findStart(paths)];
    var dir = [1, 0];
    var letters = '';
    var steps = 0;
    
    while(true) {
        var char = getChar(paths, pos);
        if (char === '+') {
            dir = newDir(paths, pos, dir);
        } else if (allLetters.indexOf(char) >= 0) {
            letters += char;
        } else if (char !== '-' && char !== '|') {
            return steps;
        }

        pos = add(pos, dir);
        steps++;
    }
}

var solution = R.pipe(parseInput, run);

module.exports = solution;