var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(','));

var step = (pos, dir) => {
    if (dir === 'n') {
        return {x: pos.x + 1, y: pos.y, z: pos.z - 1};
    } else if (dir === 's') {
        return {x: pos.x - 1, y: pos.y, z: pos.z + 1};
    } else if (dir === 'ne') {
        return {x: pos.x + 1, y: pos.y - 1, z: pos.z};
    } else if (dir === 'sw') {
        return {x: pos.x - 1, y: pos.y + 1, z: pos.z};
    } else if (dir === 'se') {
        return {x: pos.x, y: pos.y - 1, z: pos.z + 1};
    } else if (dir === 'nw') {
        return {x: pos.x, y: pos.y + 1, z: pos.z - 1};
    }
}

var dist = R.curry((a, b) => (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2);

var solution = R.pipe(parseInput, R.reduce(step, {x:0, y:0, z:0}), dist({x:0, y:0, z:0}));

module.exports = solution;