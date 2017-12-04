var R = require('ramda');

var dist = n => {
    var sqr = Math.floor(Math.sqrt(n));
    var diff = n - Math.pow(sqr, 2);
    var x = Math.floor((sqr - 1) / 2) + Math.min(1, diff) - Math.max(diff - (sqr + 1), 0);
    var y = Math.floor(sqr / 2) - Math.min(Math.max(diff - 1, 0), sqr);
    return Math.abs(x) + Math.abs(y);
}

var solution = R.pipe(parseInt, dist);

module.exports = solution;