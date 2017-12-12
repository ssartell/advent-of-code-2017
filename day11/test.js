var assert = require('assert');

describe('day 11', function() {
    describe('part 1', function() {
        var part1 = require('./part1');
        it('ne,ne,ne', function() {
            assert.equal(part1('ne,ne,ne'), 3);
        });
        it('ne,ne,sw,sw', function() {
            assert.equal(part1('ne,ne,sw,sw'), 0);
        });
        it('ne,ne,s,s', function() {
            assert.equal(part1('ne,ne,s,s'), 2);
        });
        it('se,sw,se,sw,sw', function() {
            assert.equal(part1('se,sw,se,sw,sw'), 3);
        });
    });
});