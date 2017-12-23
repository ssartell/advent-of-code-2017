var R = require('ramda');

var debug = x => {debugger; return x;};

var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.trim, R.split(''))));

var dot = R.curry((v1, v2) => R.pipe(R.map(R.apply(R.multiply)), R.sum)(R.zip(v1, v2)));
var multiply = R.curry((mat, vec) => R.map(x => dot(x, vec))(mat));
var add = R.curry((a, b) => R.map(R.sum, R.zip(a, b)));

var toKey = (x, y) => `${x},${y}`;

var toHash = map => {
    var hash = {};
    for(var x = 0; x < map.length; x++) {
        for(var y = 0; y < map[0].length; y++) {
            hash[toKey(x, y)] = map[x][y];
        }
    }
    return hash;
};

var createCarrier = (x, y) => {
    return {
        pos: [x, y],
        dir: [-1, 0],
        turnLeft: function() {
            this.dir = multiply([[0, -1],[1, 0]], this.dir);
        },
        turnRight: function() {
            this.dir = multiply([[0, 1],[-1, 0]], this.dir);
        },
        moveForward: function() {
            this.pos = add(this.pos, this.dir);
        }
    };
};

var getVal = (map, pos) => map[toKey(pos[0], pos[1])] || '.';
var setVal = (map, pos, val) => { map[toKey(pos[0], pos[1])] = val; };

var run = map => {
    var infectCount = 0;
    var carrier = createCarrier(12, 12);
    for(var i = 0; i < 10000; i++) {
        var node = getVal(map, carrier.pos);
        if (node === '#') {
            carrier.turnRight();
            setVal(map, carrier.pos, '.');
        } else {
            carrier.turnLeft();
            setVal(map, carrier.pos, '#');
            infectCount++;
        }
        carrier.moveForward();
    }

    return infectCount;
}

var solution = R.pipe(parseInput, toHash, run);

module.exports = solution;