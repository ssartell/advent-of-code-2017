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
    for(var i of insts) {
        regs[i.reg1] = regs[i.reg1] || 0;
        regs[i.reg2] = regs[i.reg2] || 0;
        if (ops[i.cond](regs[i.reg2], i.val)) 
            regs[i.reg1] = ops[i.op](regs[i.reg1], i.by);
    }

    return R.reduce(R.max, -Infinity, R.values(regs));
}

var solution = R.pipe(parseInput, run);

module.exports = solution;