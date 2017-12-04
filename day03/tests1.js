var assert = require('assert');

var solution = require('./part1');

var runTests = () => {
    assert.strictEqual(solution('1'), 0);
    assert.strictEqual(solution('12'), 3);
    assert.strictEqual(solution('23'), 2);
    assert.strictEqual(solution('1024'), 31);
};

module.exports = runTests;