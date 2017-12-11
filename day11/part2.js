var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(','));

var step = (pos, dir) => {
    if (dir === 'n') {
        pos.x++;
        pos.z--;
    } else if (dir === 's') {
        pos.x--;
        pos.z++;
    } else if (dir === 'ne') {
        pos.x++;
        pos.y--;
    } else if (dir === 'sw') {
        pos.x--;
        pos.y++;
    } else if (dir === 'se') {
        pos.y--;
        pos.z++;
    } else if (dir === 'nw') {
        pos.y++;
        pos.z--;
    }

    var newDist = dist({x:0, y:0, z:0}, pos);
    pos.max = R.max(pos.max, newDist);

    return pos;
}

var dist = R.curry((a, b) => (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2);

var solution = R.pipe(parseInput, R.reduce(step, {x:0, y:0, z:0, max: 0}), R.prop('max'));

module.exports = solution;