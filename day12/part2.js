var R = require('ramda');

var readLine = R.pipe(R.trim, R.split(' <-> '), R.adjust(R.split(', '), 1))
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine), R.transpose, R.apply(R.zipObj));

var findAllInGroup = (seen, x, progs) => {
    var found = [x];
    seen[x] = true;
    for(var prog of progs[x]) {
        if (!seen[prog]) {
            found = R.concat(found, findAllInGroup(seen, prog, progs));
        }
    }
    return found;
}

var run = progs => {
    var remaining = R.keys(progs);
    var groups = 0;
    while (remaining.length > 0) {
        var x = R.head(remaining);
        var fromGroup = findAllInGroup({}, x, progs);
        remaining = R.without(fromGroup, remaining);
        groups++;
    }
    return groups;
};

var solution = R.pipe(parseInput, run);

module.exports = solution;