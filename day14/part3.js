var R = require('ramda');
var knot = require('../day10/part2');
var M = require('mnemonist');
var out = require('./output');

var toHashes = x => R.map(y => knot(`${x}-${y}`), R.range(0, 128));
var parseInput = R.pipe(R.trim, toHashes);

var pad = n => ("000" + n).substr(-4);
var hexToBinary = x => pad(parseInt(x, 16).toString(2));

var neighbors = R.sortBy(Math.random, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
var add = (a, b) => R.map(R.sum, R.zip(a, b));
var inBounds = pos => 0 <= pos.x && pos.x <= 127 && 0 <= pos.y && pos.y <= 127; 

var run = blocks => {
    out.printBlocks(blocks);
    var regions = 0;
    var visited = {};
    
    // circle
    // var start = {x: 63, y: 63, fromRegion: false};
    // var getFunky = (a, b) => (Math.hypot(a.x - start.x,a.y - start.y) < Math.hypot(b.x - start.x, b.y - start.y));

    // diamond
    // var start = {x: 63, y: 63, fromRegion: false};
    // var getFunky = (a, b) => Math.abs(a.x - start.x) + Math.abs(a.y - start.y) < Math.abs(b.x - start.x) + Math.abs(b.y - start.y);
    
    // random
    // var start = {x: 63, y: 63, fromRegion: false};
    // var getFunky = (a, b) => false;

    // from last
    // var start = {x: 63, y: 63, fromRegion: false};
    // var getFunky = (a, b) => a.i > b.i;

    // from first
    // var start = {x: 63, y: 63, fromRegion: false};
    // var getFunky = (a, b) => a.i < b.i;

    // from first
    var start = {x: 0, y: 0, fromRegion: false};
    var getFunky = (a, b) => a.x + a.y > b.x + b.y;
    
    var queue = new M.MinHeap(R.comparator((a, b) => {
        if (a.fromRegion && blocks[a.x][a.y] === 1) return true;
        if (b.fromRegion && blocks[b.x][b.y] === 1) return false;
        if (blocks[a.x][a.y] > blocks[b.x][b.y]) return true;
        if (blocks[a.x][a.y] < blocks[b.x][b.y]) return false;
        return getFunky(a, b);
    }));
    queue.push(start);
    var size = 0;
    var i = 0;
    while(queue.size) {
        var pos = queue.pop();
        
        var key = `${pos.x},${pos.y}`;
        if (visited[key]) continue;
        visited[key] = true;

        var val = blocks[pos.x][pos.y];
        if (val === 1 && !pos.fromRegion) {
            regions++;
            size = 1;
        }
        if (val === 1) {
            out.printPos(pos, regions);
        }

        i++;
        size++;
        out.sleep(size/100);
        
        for(var neighbor of neighbors) {
            var newPos = {x: pos.x + neighbor[0], y: pos.y + neighbor[1], fromRegion: val === 1, i: i };
            if (inBounds(newPos)) queue.push(newPos);
        }
    }

    out.gotoEnd(blocks);

    return regions;
};

var solution = R.pipe(parseInput, R.map(R.map(hexToBinary)), R.map(R.chain(R.map(parseInt))), run);

module.exports = solution;