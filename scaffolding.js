var R = require('ramda');
var fs = require('fs');
var Stopwatch = require("node-stopwatch").Stopwatch;
var ansi = require('ansi');
var cursor = ansi(process.stdout);

function pad(digit, width, char) {
  char = char || '0';
  digit = digit + '';
  return digit.length >= width ? digit : new Array(width - digit.length + 1).join(char) + digit;
}

function testsPassed(day, part) {
    day = pad(day, 2);
    
    var tests = require('./day' + day + '/tests' + part);
    
    try{
        tests();   
    } catch (e) {
        return false;
    }
     
    return true;
}

function runSolution(day, part) {
	day = pad(day, 2);
	
	var input = fs.readFileSync('day' + day + '/input.txt', 'utf8');
	var solution = require('./day' + day + '/part' + part);

	return solution(input);
}

function run(day, part, shouldRunTests) {
    var log = 'day ' + day + ', part ' + part

    if (shouldRunTests) {
        var passed = testsPassed(day, part);
        if (passed) {
            log += ' : tests passed';
        } else {
            log += ' : tests failed'
        }
    }

    var stopwatch = Stopwatch.create();

	stopwatch.start();
    var answer = runSolution(day, part);
    stopwatch.stop();
    
    log += ' : ' + stopwatch.elapsed.seconds + 's'
    
    console.log(log);
	console.log(answer);
}

module.exports = run;