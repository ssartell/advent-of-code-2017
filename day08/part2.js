var R = require('ramda');

var readLine = R.pipe(R.split(' '), R.zipObj(['reg1', 'op', 'by', 'if', 'reg2', 'cond', 'val']), R.evolve({by: parseInt, val: parseInt}));
var parseInput = R.pipe(R.split('\n'), R.map(readLine));

var ops = {
    '<': (a, b) => a < b,
    '<=': (a, b) => a <= b,
    '>': (a, b) => a > b,
    '>=': (a, b) => a >= b,
    '==': (a, b) => a == b,
    '!=': (a, b) => a != b,
    inc: (a, b) => a + b,
    dec: (a, b) => a - b
};

var run = insts => {
    var regs = {};
    var max = -Infinity;
    for(var i of insts) {
        if (!R.has(i.reg1, regs)) regs[i.reg1] = 0;
        if (!R.has(i.reg2, regs)) regs[i.reg2] = 0;
        if (ops[i.cond](regs[i.reg2], i.val)) {
            regs[i.reg1] = ops[i.op](regs[i.reg1], i.by);
            if (regs[i.reg1] > max) max = regs[i.reg1];
        }
    }

    return max;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;