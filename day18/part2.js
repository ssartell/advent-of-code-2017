var R = require('ramda');
var Queue = require('mnemonist/queue');

var lineRegex = /(\w*) (-?[\w\d]*)(?: (-?[\w\d]*))?/;
var tryParseInt = x => isNaN(parseInt(x)) ? x : parseInt(x);
var readLine = R.pipe(R.match(lineRegex), R.tail, R.zipObj(['op', 'x', 'y']), R.evolve({x: tryParseInt, y: tryParseInt}));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var createProg = (insts, outQueue, inQueue, id) => {
    var sent = 0;
    var i = 0;
    var registers = { p: id };
    var getVal = x => Number.isInteger(x) ? x : (registers[x] || 0);
    var ops = {
        snd: x => { outQueue.enqueue(getVal(x)); i++; sent++; },
        set: (x, y) => { registers[x] = getVal(y); i++; },
        add: (x, y) => { registers[x] = getVal(x) + getVal(y); i++; },
        mul: (x, y) => { registers[x] = getVal(x) * getVal(y); i++; },
        mod: (x, y) => { registers[x] = getVal(x) % getVal(y); i++; },
        rcv: (x, y) => { registers[x] = inQueue.dequeue(); i++; },
        jgz: (x, y) => { 
            if (getVal(x) > 0) {
                i += getVal(y);
            } else {
                i++;
            }
        }
    };
    return () => {
        while(i < insts.length) {
            var inst = insts[i];
            if (inst.op === 'rcv' && inQueue.size === 0)
                return {blocked: true, sent: sent};
            var val = ops[inst.op](inst.x, inst.y);
        }
        return {blocked: false, sent: sent};
    };
};

var run = insts => {
    var a = new Queue();
    var b = new Queue();
    var progA = createProg(insts, a, b, 0);
    var progB = createProg(insts, b, a, 1);

    do {
        var resultA = progA();
        var resultB = progB();
    } while((resultA.blocked && b.size !== 0) || (resultB.blocked && a.size !== 0));

    return resultB.sent;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;