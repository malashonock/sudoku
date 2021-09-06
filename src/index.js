// Utility functions
function traverseMatrix(matrix, callback) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      let result = callback(matrix[i][j], i, j, matrix);
      if (result) return result;
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

function getSolidDigitsFromRow(matrix, row) {
  return matrix[row].filter((val, idx, arr) => !Array.isArray(val));
}

function getSolidDigitsFromColumn(matrix, col) {
  const solidDigits = [];
  
  for (let row = 0; row < matrix.length; row++) {
    const value = matrix[row][col]
    if (!Array.isArray(value)) {
      solidDigits.push(value);      
    }
  }

  return solidDigits;
}

function getNextArrayCellCoords(matrix) {
  return traverseMatrix(matrix, (value, row, col, matrix) => {
    if (Array.isArray(value)) {
      return { row: row, col: col };
    }
  });
}

function containsEmptyArrayCell(matrix) {
  return traverseMatrix(matrix, (value, row, col, matrix) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
    }
  });

  return false;
}

function areMatricesEqual(matrix1, matrix2) {
  const flat1 = matrix1.flat(1);
  const flat2 = matrix2.flat(1);

  if (matrix1.length !== matrix2.length) {
    return false;
  }

  for (let i = 0; i < matrix1.length; i++) {
    if (matrix1[i].join('') !== matrix2[i].join('')) {
      return false;
    }
  }

  return true;
}

function deepCopy(array) {
  return JSON.parse(JSON.stringify(array));
}

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function prepareSudoku(sudoku) {
  let sudokuCopy = deepCopy(sudoku);

  // Step 1: in each quadrant, replace zeros with arrays of unused digits
  const quadrants = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      quadrants.push(getQuadrant(sudokuCopy, i, j));
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

  return combineQuadrants(quadrants);
}

function solveSudokuDeterminately(sudoku) {
  let sudokuCopy = deepCopy(sudoku);

  // Step 2: for each array cell, remove solid digits that are present in its row/column
  // If there's only one element left in array cell, flatten the array
  // Repeat until no more changes are applied
  let sudokuBefore = [];

  do {
    sudokuBefore = deepCopy(sudokuCopy);
    
    traverseMatrix(sudokuCopy, (cellContent, row, col, sudoku) => {
      if (Array.isArray(cellContent)) {
        const solidDigitsInRow = getSolidDigitsFromRow(sudoku, row);
        const solidDigitsInColumn = getSolidDigitsFromColumn(sudoku, col);

        sudoku[row][col] = cellContent
          .filter(value => !solidDigitsInRow.includes(value))
          .filter(value => !solidDigitsInColumn.includes(value));

        if (sudoku[row][col].length === 1) {
          sudoku[row][col] = sudoku[row][col][0];
        }
      }
    });
  } while (!areMatricesEqual(sudokuCopy, sudokuBefore));

  return sudokuCopy;
}

function generateSudokuSolutions(sudoku) {
  let sudokuCopy = deepCopy(sudoku);

  sudokuCopy = solveSudokuDeterminately(sudokuCopy);

  if (containsEmptyArrayCell(sudokuCopy)) {
    return null; // dead end
  }

  if (!getNextArrayCellCoords(sudokuCopy)) {
    console.log(sudokuCopy);
    return sudokuCopy; // success
  }


  // Step 3: Choose any array cell, then try recursively to solve sudoku
  // assuming for each of array elements that it's a solid value in this cell
  const nextArrayCellCoords = getNextArrayCellCoords(sudokuCopy);
  const nextOptions = [...sudokuCopy[nextArrayCellCoords.row][nextArrayCellCoords.col]];

  for (let option of nextOptions) {
    let anotherSudokuCopy = deepCopy(sudokuCopy);
    let solutionAttempt;
    
    anotherSudokuCopy[nextArrayCellCoords.row][nextArrayCellCoords.col] = option;
    solutionAttempt = generateSudokuSolutions(anotherSudokuCopy);
    
    if (solutionAttempt) return solutionAttempt;
  }
}

function solveSudoku(matrix) {
  let sudoku = prepareSudoku(matrix);
  return generateSudokuSolutions(sudoku);
}

const sudokuToSolve = [
  [6, 5, 0, 7, 3, 0, 0, 8, 0],
  [0, 0, 0, 4, 8, 0, 5, 3, 0],
  [8, 4, 0, 9, 2, 5, 0, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [5, 3, 0, 2, 0, 9, 6, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 6],
  [0, 0, 7, 0, 0, 0, 0, 5, 0],
  [1, 6, 5, 3, 9, 0, 4, 7, 0]
];

solveSudoku(sudokuToSolve);

module.exports = solveSudoku;
