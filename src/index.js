// Utility functions
function traverseMatrix(matrix, callback) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      callback(matrix[i][j], i, j, matrix);
    }
  }
}

function getQuadrant(sudoku, rowIndex, colIndex) {
  const quadrant = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ];

  traverseMatrix(sudoku, (value, row, col) => {
    if (Math.floor(row / 3) === rowIndex && Math.floor(col / 3) === colIndex) {
      quadrant[row % 3][col % 3] = value;
    }
  });

  return quadrant;
}

function combineQuadrants(quadrants) {
  const sudoku = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sudoku.push([
        ...quadrants[3 * i + 0][j], 
        ...quadrants[3 * i + 1][j], 
        ...quadrants[3 * i + 2][j]
      ]);
    }
  }

  return sudoku;
}

function getUnusedDigits(quadrant) {
  const digits = [...DIGITS];

  traverseMatrix(quadrant, (value, row, col) => {
    if (DIGITS.includes(value)) {
      digits.splice(digits.indexOf(value), 1);
    }
  });

  return digits;
}

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function solveSudoku(matrix) {
  let sudoku = [...matrix]; // clone array

  // Step 1: in each quadrant, replace zeros with arrays of unused digits
  const quadrants = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      quadrants.push(getQuadrant(sudoku, i, j));
    }
  }

  const unusedDigits = quadrants.map((q) => getUnusedDigits(q));

  quadrants.map((q, i) => {
    traverseMatrix(q, (value, row, col, q) => {
      if (value === 0) {
        q[row][col] = unusedDigits[i];
      }
    });
  });

  sudoku = combineQuadrants(quadrants);

  // Step 2: for each array cell, remove solid digits that are present in its row/column
  traverseMatrix(sudoku, (cellContent, row, col, sudoku) => {
    if (Array.isArray(cellContent)) {
      // ...
    }
  });
  
  return sudoku;
}

const sudokuToSolve = [
  [0, 5, 0, 0, 7, 0, 0, 0, 1],
  [8, 7, 6, 0, 2, 1, 9, 0, 3],
  [0, 0, 0, 0, 3, 5, 0, 0, 0],
  [0, 0, 0, 0, 4, 3, 6, 1, 0],
  [0, 4, 0, 0, 0, 9, 0, 0, 2],
  [0, 1, 2, 0, 5, 0, 0, 0, 4],
  [0, 8, 9, 0, 6, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 7, 0, 0, 0],
  [1, 6, 7, 0, 0, 2, 5, 4, 0]
];

const solvedSudoku = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

solveSudoku(sudokuToSolve);

module.exports = solveSudoku;
