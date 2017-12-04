var R = require('ramda');

var dist = (x, y) => Math.abs(x) + Math.abs(y);
var getPos = n => {
    var sqr = Math.floor(Math.sqrt(n));
    var diff = n - Math.pow(sqr, 2);
    var x = Math.floor((sqr - 1) / 2) + Math.min(1, diff) - Math.max(diff - (sqr + 1), 0);
    var y = Math.floor(sqr / 2) - Math.min(Math.max(diff - 1, 0), sqr);
    return sqr % 2 === 1 ? [x, y] : [-x, -y];
}

var solution = R.pipe(parseInt, getPos, R.apply(dist));

module.exports = solution;