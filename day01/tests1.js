var assert = require('assert');

var solution = require('./part1');

var runTests = () => {
    assert.strictEqual(solution('1122'), 3);
    assert.strictEqual(solution('1111'), 4);
    assert.strictEqual(solution('1234'), 0);
    assert.strictEqual(solution('91212129'), 9);
};

module.exports = runTests;