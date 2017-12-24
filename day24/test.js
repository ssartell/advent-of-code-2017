var assert = require('assert');

describe('day24', function() {
    var input = ['0/2',
                '2/2',
                '2/3',
                '3/4',
                '3/5',
                '0/1',
                '10/1',
                '9/10'].join('\n');
    describe('part 1', function() {
        var part1 = require('./part1');
        it('test', function() {
            assert.equal(part1(input), 31);
        });
    });
    
    describe('part 2', function() {
        var part2 = require('./part2');
        // it('test', function() {
        //     assert.equal(part1(input), 1);
        // });
    });
});