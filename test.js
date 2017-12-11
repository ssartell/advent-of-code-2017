var assert = require('assert');

describe('day 1', function() {
    describe('part 1', function() {
        var solution = require('./day01/part1');
        it('1122', function() {
            assert.equal(solution('1122'), 3);
        });     
        it('1111', function() {
            assert.equal(solution('1111'), 4);
        });
        it('1234', function() {
            assert.equal(solution('1234'), 0);
        });
        it('91212129', function() {
            assert.equal(solution('91212129'), 9);
        });  
    });
});

describe('day 8', function() {
    var input = ['b inc 5 if a > 1',
                'a inc 1 if b < 5',
                'c dec -10 if a >= 1',
                'c inc -20 if c == 10'].join('\n');

    describe('part 1', function() {
        var solution = require('./day08/part1');
        it('test', function() {
            assert.equal(solution(input), 1);
        });
    });
    
    describe('part 2', function() {
        var solution = require('./day08/part2');
        it('test', function() {
            assert.equal(solution(input), 10);
        });
    });
});

describe('day 11', function() {
    describe('part 1', function() {
        var solution = require('./day11/part1');
        it('ne,ne,ne', function() {
            assert.equal(solution('ne,ne,ne'), 3);
        });
        it('ne,ne,sw,sw', function() {
            assert.equal(solution('ne,ne,sw,sw'), 0);
        });
        it('ne,ne,s,s', function() {
            assert.equal(solution('ne,ne,s,s'), 2);
        });
        it('se,sw,se,sw,sw', function() {
            assert.equal(solution('se,sw,se,sw,sw'), 3);
        });
    });
});

function pad(digit, width, char) {
    char = char || '0';
    digit = digit + '';
    return digit.length >= width ? digit : new Array(width - digit.length + 1).join(char) + digit;
}