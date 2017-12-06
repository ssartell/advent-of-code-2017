var R = require('ramda');

var parseInput = R.pipe(R.split('\n'), R.map(parseInt));

var navigateMaze = maze => {
    var i = 0;
    var steps = 0;

    while (i >= 0 && i < maze.length) {
        var delta = maze[i];
        maze[i]++;
        i += delta;
        steps++;
    }

    return steps;
};

var solution = R.pipe(parseInput, navigateMaze);

module.exports = solution;