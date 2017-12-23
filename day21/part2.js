var R = require('ramda');

var debug = x => {debugger; return x;};
var start = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
];

var readLine = R.pipe(R.trim, R.split(' => '), R.map(R.pipe(R.split('/'), R.map(R.split('')))), R.zipObj(['input', 'output']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var extractCell = (x, y, grid, size) => {
    var result = [];
    for(var i = x; i < x + size; i++){
        var row = [];
        for(var j = y; j < y + size; j++){
            row.push(grid[i][j]);
        }
        result.push(row);
    }
    return result;
};

var writeCell = (x, y, cell, grid) => {
    for(var i = 0; i < cell.length; i++){
        for(var j = 0; j < cell[0].length; j++){
            grid[x + i][y + j] = cell[i][j];
        }
    }
};

var cellsEqual = (cell1, cell2) => {
    if (cell1.length !== cell2.length) return false;
    for(var i = 0; i < cell1.length; i++){
        for(var j = 0; j < cell1[0].length; j++){
            if (cell1[i][j] !== cell2[i][j]) return false;
        }
    }
    return true;
};

var expand = transform => {
    var result = [];
    var input = transform.input;
    for(var i = 0; i < 4; i++) {
        input = R.transpose(input);
        result.push({input: input, output: transform.output});
        input = R.reverse(input);
        result.push({input: input, output: transform.output});
    }
    return result;
};

var countOnPixels = grid => {
    var count = 0;
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[0].length; j++){
            count += grid[i][j] === '#' ? 1 : 0;
        }
    }

    return count;
}

var findTransform = (cell, transforms) => R.find(x => cellsEqual(x.input, cell), transforms);

var run = transforms => {
    var grid = start;
    for(var i = 0; i < 18; i++) {
        var gridSize = grid.length;
        var isTwoCell = grid.length % 2 === 0;
        var cellSize = isTwoCell ? 2 : 3;
        var newCellSize = isTwoCell ? 3 : 4;
        var newGridSize = isTwoCell ? gridSize / 2 * 3 : gridSize / 3 * 4;
        var newGrid = R.map(x => R.repeat(null, newGridSize), R.repeat(null, newGridSize));

        for(var x = 0; x < gridSize; x += cellSize) {
            var xx = x / cellSize * newCellSize;
            for(var y = 0; y < gridSize; y += cellSize) {
                var yy = y / cellSize * newCellSize;
                var cell = extractCell(x, y, grid, cellSize);
                var transform = findTransform(cell, transforms);
                if (transform === null || transform === undefined) debugger;
                writeCell(xx, yy, transform.output, newGrid);
            }
        }

        grid = newGrid;
    }

    return countOnPixels(grid);
}

var solution = R.pipe(parseInput, R.chain(expand), run);

module.exports = solution;