var R = require('ramda');
var C = require('js-combinatorics');

var oldVals = {};
var neighbors = C.baseN([-1, 0, 1], 2).toArray();

var add = (a, b) => R.map(R.sum, R.zip(a, b));
var getKey = pos => `${pos[0]},${pos[1]}`;
var getPos = n => {
    var sqr = Math.floor(Math.sqrt(n));
    var diff = n - Math.pow(sqr, 2);
    var x = Math.floor((sqr - 1) / 2) + Math.min(1, diff) - Math.max(diff - (sqr + 1), 0);
    var y = Math.floor(sqr / 2) - Math.min(Math.max(diff - 1, 0), sqr);
    return sqr % 2 === 1 ? [x, y] : [-x, -y];
}
var neighborsSum = pos => R.sum(R.map(n => oldVals[getKey(add(pos, n))] || 0, neighbors));

var spiral = n => {
    var i = 1;
    var val = 1;
    
    while (val < n) {
        var pos = getPos(i);
        var key = getKey(pos);
        val = neighborsSum(pos) || 1;
        oldVals[key] = val;
        i++
    }
    return val;
}

var solution = R.pipe(parseInt, spiral);

module.exports = solution;