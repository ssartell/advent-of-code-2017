var R = require('ramda');
var C = require('js-combinatorics');

var lineRegex = /p=<(-?\d*),(-?\d*),(-?\d*)>, v=<(-?\d*),(-?\d*),(-?\d*)>, a=<(-?\d*),(-?\d*),(-?\d*)>/;
var readLine = R.pipe(R.trim, R.match(lineRegex), R.tail, R.map(parseInt), R.splitEvery(3), R.zipObj(['p', 'v', 'a']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var add = (a, b) => R.map(R.sum, R.zip(a, b));
var coords = p => `${p.p[0]},${p.p[1]},${p.p[2]}`;
var origin = [0, 0, 0];

var update = R.map(p => ({ a: R.clone(p.a), v: add(p.v, p.a), p: add(p.p, add(p.v, p.a)) }));
var removeCollisions = R.pipe(R.groupBy(coords), R.filter(x => x.length === 1), R.values, R.flatten);

var run = particles => {
    var lastCount = particles.length;
    var tick = 0;
    while(tick < 10) {
        particles = update(particles);
        particles = removeCollisions(particles);
        tick = lastCount != particles.length ? 0 : tick + 1;
        lastCount = particles.length;
    }

    return particles.length;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;