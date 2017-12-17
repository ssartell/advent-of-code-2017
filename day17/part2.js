var R = require('ramda');

var run = step => {
    var pos = 0; 
    var result = 0;
    for (var i = 1; i <= 50000000; i++)
    {
        pos = (pos + step + 1) % i;
        if (pos === 0) result = i;
    }
    return result;
}

var solution = R.pipe(parseInt, run);

module.exports = solution;