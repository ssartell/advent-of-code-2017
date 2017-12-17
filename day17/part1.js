var R = require('ramda');
var Queue = require('mnemonist/queue');

var parseInput = R.pipe(R.trim, parseInt);

var run = step => {
    var queue = Queue.from([0]);
    for(var i = 1; i <= 2017; i++) {
        for(var j = 0; j < step; j++) {
            queue.enqueue(queue.dequeue());
        }
        queue.enqueue(i);
    }

    return queue.dequeue();
}

var solution = R.pipe(parseInput, run);

module.exports = solution;