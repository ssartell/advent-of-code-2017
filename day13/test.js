var assert = require('assert');

describe('day 12', function() {
    var input = ['0: 3',
                '1: 2',
                '4: 4',
                '6: 4'].join('\n');
    describe('part 1', function() {
        var part1 = require('./part1');
        it('severity', function() {
            assert.equal(part1(input), 24);
        });
    });
    describe('part 2', function() {
        var part2 = require('./part2');
        it('wait', function() {
            assert.equal(part2(input), 10);
        });
    });
});