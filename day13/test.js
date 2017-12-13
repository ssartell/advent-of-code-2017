var assert = require('assert');

describe('day 12', function() {
    describe('part 1', function() {
        var input = ['0: 3',
                    '1: 2',
                    '4: 4',
                    '6: 4'].join('\n');
        var part1 = require('./part1');
        it('severity', function() {
            assert.equal(part1(input), 24);
        });
    });
});