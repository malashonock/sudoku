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

function solveSudoku(matrix) {


  return matrix;
}

const testSudoku = [
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

console.log(getQuadrant(testSudoku, 2, 2));

module.exports = solveSudoku;
