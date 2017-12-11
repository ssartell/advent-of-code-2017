var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(','));

var step = (pos, dir) => {
    var newPos;
    if (dir === 'n') {
        newPos = {x: pos.x + 1, y: pos.y, z: pos.z - 1};
    } else if (dir === 's') {
        newPos = {x: pos.x - 1, y: pos.y, z: pos.z + 1};
    } else if (dir === 'ne') {
        newPos = {x: pos.x + 1, y: pos.y - 1, z: pos.z};
    } else if (dir === 'sw') {
        newPos = {x: pos.x - 1, y: pos.y + 1, z: pos.z};
    } else if (dir === 'se') {
        newPos = {x: pos.x, y: pos.y - 1, z: pos.z + 1};
    } else if (dir === 'nw') {
        newPos = {x: pos.x, y: pos.y + 1, z: pos.z - 1};
    }

    var newDist = dist({x:0, y:0, z:0}, newPos);
    newPos.max = R.max(pos.max, newDist);

    return newPos;
}

var dist = R.curry((a, b) => (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2);

var solution = R.pipe(parseInput, R.reduce(step, {x:0, y:0, z:0, max: 0}), R.prop('max'));

module.exports = solution;