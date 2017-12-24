var R = require('ramda');
var Queue = require('mnemonist/queue');

var readLine = R.pipe(R.trim, R.split('/'), R.map(parseInt), R.zipObj(['l', 'r']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var maxBridge = (state, components) => {
    var validComponents = R.filter(x => x.l === state.r || x.r === state.r, components);
    if (validComponents.length === 0) return state;
    return R.reduce((a, x) => {
        var newState = {
            str: x.l + x.r + state.str,
            length: state.length + 1,
            r: x.l === state.r ? x.r : x.l
        };
        var max = maxBridge(newState, R.without([x], components));
        return (max.length === a.length) && (max.str > a.str) || (max.length > a.length) ? max : a;
    }, {str: 0, length: 0}, validComponents)
}

var run = components => {
    return maxBridge({str: 0, length: 0, r: 0}, components).str;
}

var solution = R.pipe(parseInput, run);

module.exports = solution;