var assert = require('assert');

describe('day 1', () => {
    describe('part 1', () => {
        var solution = require('./day01/part1');
        it('1122', () => {
            assert.equal(solution('1122'), 3);
        });     
        it('1111', () => {
            assert.equal(solution('1111'), 4);
        });
        it('1234', () => {
            assert.equal(solution('1234'), 0);
        });
        it('91212129', () => {
            assert.equal(solution('91212129'), 9);
        });  
    });
});

describe('day 8', () => {
    var input = ['b inc 5 if a > 1',
                'a inc 1 if b < 5',
                'c dec -10 if a >= 1',
                'c inc -20 if c == 10'].join('\n');

    describe('part 1', () => {
        var solution = require('./day08/part1');
        it('test', () => {
            assert.equal(solution(input), 1);
        });
    });
    
    describe('part 2', () => {
        var solution = require('./day08/part2');
        it('test', () => {
            assert.equal(solution(input), 10);
        });
    });
});

function pad(digit, width, char) {
    char = char || '0';
    digit = digit + '';
    return digit.length >= width ? digit : new Array(width - digit.length + 1).join(char) + digit;
}