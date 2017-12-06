var R = require('ramda');

var parseInput = R.pipe(R.split('\n'), R.map(parseInt));

var navigateMaze = maze => {
    var i = 0;
    var steps = 0;

    while (i >= 0 && i < maze.length) {
        var delta = maze[i];
        maze[i] += delta >= 3 ? -1 : 1;
        i += delta;
        steps++;
    }

    return steps;
};

var solution = R.pipe(parseInput, navigateMaze);

module.exports = solution;