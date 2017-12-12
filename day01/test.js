var assert = require('assert');

describe('day 1', function() {
    describe('part 1', function() {
        var part1 = require('./part1');
        it('1122', function() {
            assert.equal(part1('1122'), 3);
        });     
        it('1111', function() {
            assert.equal(part1('1111'), 4);
        });
        it('1234', function() {
            assert.equal(part1('1234'), 0);
        });
        it('91212129', function() {
            assert.equal(part1('91212129'), 9);
        });  
    });
});