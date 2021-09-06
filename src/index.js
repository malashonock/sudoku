// Utility functions
function traverseMatrix(matrix, callback) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      callback(matrix[i][j], i, j);
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
  const sudoku = [...matrix]; // clone array

  

  return sudoku;
}

const sudokuToSolve = [
  [5, 3, 4, 6, 7, 8, 9, 0, 0],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
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

const q1 = getQuadrant(solvedSudoku, 0, 0);
const q2 = getQuadrant(solvedSudoku, 0, 1);
const q3 = getQuadrant(solvedSudoku, 0, 2);
const q4 = getQuadrant(solvedSudoku, 1, 0);
const q5 = getQuadrant(solvedSudoku, 1, 1);
const q6 = getQuadrant(solvedSudoku, 1, 2);
const q7 = getQuadrant(solvedSudoku, 2, 0);
const q8 = getQuadrant(solvedSudoku, 2, 1);
const q9 = getQuadrant(solvedSudoku, 2, 2);

const quadrants = [q1, q2, q3, q4, q5, q6, q7, q8, q9];

console.log(combineQuadrants(quadrants));

module.exports = solveSudoku;
