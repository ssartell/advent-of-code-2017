var R = require('ramda');

var parseInput = R.pipe(R.trim);

var run = stream => {
    var i = 0;
    var level = 0;
    var score = 0;
    var inGarbage = false;
    while (i < stream.length) {
        var char = stream[i];
        if (char === '{' && !inGarbage) {
            level++;
            score += level;
        } else if (char === '}' && !inGarbage) {
            level--;
        } else if (char === '<' && !inGarbage) {
            inGarbage = true;
        } else if (char === '>' && inGarbage) {
            inGarbage = false;
        } else if (char === '!' && inGarbage) {
            i++;
        }
        i++;
    }
    return score;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;