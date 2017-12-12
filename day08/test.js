var assert = require('assert');

describe('day 8', function() {
    var input = ['b inc 5 if a > 1',
                'a inc 1 if b < 5',
                'c dec -10 if a >= 1',
                'c inc -20 if c == 10'].join('\n');

    describe('part 1', function() {
        var part1 = require('./part1');
        it('test', function() {
            assert.equal(part1(input), 1);
        });
    });
    
    describe('part 2', function() {
        var part2 = require('./part2');
        it('test', function() {
            assert.equal(part2(input), 10);
        });
    });
});