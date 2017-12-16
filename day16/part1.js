var R = require('ramda');

var tryParseInt = x => isNaN(parseInt(x)) ? x : parseInt(x);
var lineRegex = /([sxp])([\d\w]*)\/?([\d\w]*)/;
var toMove = R.pipe(R.match(lineRegex), R.tail, R.zipObj(['move', 'x', 'y']), R.evolve({x: tryParseInt, y: tryParseInt}));
var parseInput = R.pipe(R.trim, R.split(','), R.map(toMove));

var moveSet = {
    s: (progs, x) => R.concat(R.drop(progs.length - x, progs), R.take(progs.length - x, progs)),
    x: (progs, i, j) => {
        var temp = progs[i];
        return R.update(j, temp, R.update(i, progs[j], progs));
    },
    p: (progs, a, b) => {
        var i = R.indexOf(a, progs);
        var j = R.indexOf(b, progs);
        var temp = progs[i];
        return R.update(j, temp, R.update(i, progs[j], progs));
    }
};

var run = moves => {
    var progs = 'abcdefghijklmnop'.split('');
    for(var move of moves) {
        progs = moveSet[move.move](progs, move.x, move.y);
    }
    return progs.join('');
}

var solution = R.pipe(parseInput, run);

module.exports = solution;