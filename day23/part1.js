var R = require('ramda');

var lineRegex = /(\w*) (-?[\w\d]*)(?: (-?[\w\d]*))?/;
var tryParseInt = x => isNaN(parseInt(x)) ? x : parseInt(x);
var readLine = R.pipe(R.match(lineRegex), R.tail, R.zipObj(['op', 'x', 'y']), R.evolve({x: tryParseInt, y: tryParseInt}));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var run = insts => {
    var registers = {};
    var i = 0;
    var mult = 0;
    var getVal = x => Number.isInteger(x) ? x : (registers[x] || 0);
    var ops = {
        set: (x, y) => { registers[x] = getVal(y); i++; },
        add: (x, y) => { registers[x] = getVal(x) + getVal(y); i++; },
        sub: (x, y) => { registers[x] = getVal(x) - getVal(y); i++; },
        mul: (x, y) => { registers[x] = getVal(x) * getVal(y); i++; mult++; },
        mod: (x, y) => { registers[x] = getVal(x) % getVal(y); i++; },
        jnz: (x, y) => { 
            if (getVal(x) !== 0) {
                i += getVal(y);
            } else {
                i++;
            }
        }
    };

    while(i < insts.length) {
        var inst = insts[i];
        ops[inst.op](inst.x, inst.y);
    }

    return mult;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;