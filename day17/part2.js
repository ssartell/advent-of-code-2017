var R = require('ramda');
var Queue = require('mnemonist/queue');

var parseInput = R.pipe(R.trim, parseInt);

var run = step => {
    var queue = Queue.from([0]);
    for(var i = 1; i <= 50000000; i++) {
        for(var j = 0; j < step; j++) {
            queue.enqueue(queue.dequeue());
        }
        queue.enqueue(i);
    }

    while(queue.peek() !== 0) {
        queue.enqueue(queue.dequeue());
    }

    queue.dequeue();

    return queue.dequeue();
}

var solution = R.pipe(parseInput, run);

module.exports = solution;