export default function solver (raw_grid: Array<Array<number>>, difficulty: number) {
    /* Construction notes
    - The difficulty only works for 0, we want to see if it is a completed valid sudoku first
    - Difficulty of 1 should also fill in 'all-but-one' values
    */
    type SudokuReturnType = {
        success: boolean,
        payload: Array<Array<number>>
    }
    const sudResult: SudokuReturnType = {success: true, payload: []};
    //const oneToNine: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //const zeroToNine: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    switch (difficulty) {
        case 0:
            for(let i=0; i<9; i++){
                const uniqueRow = [...new Set(raw_grid[i])];
                const uniqueCol = [...new Set(raw_grid.map((row) => {return row[i]}))];
                const uniqueBox = [...new Set(grabBox(raw_grid, i))];
                if(uniqueRow.length === 9 && !uniqueRow.includes(0)
                   && uniqueCol.length === 9 && !uniqueCol.includes(0)
                   && uniqueBox.length === 9 && !uniqueBox.includes(0)
                 ){
                    sudResult.payload.push(uniqueRow);
                } else if (uniqueRow.includes(0)) {
                    console.log('Unfinished!');
                    return {success: false, payload: raw_grid};
                }
                 else {
                    console.log('Invalid solution!');
                    return {success: false, payload: raw_grid};
                }
            }
            console.log('Sudoku solution valid');
            return sudResult;
        default:
            return {success: false, payload: [[]]} 
    }
    console.log('You should not be down here!');
}

function grabBox(matrix: Array<Array<number>>, index: number) {
    const mRow = index - index%3;
    const mCol = 3 * (index%3);
    const newBox = [matrix[mRow].slice(mCol, mCol+3),
                    matrix[mRow+1].slice(mCol, mCol+3),
                    matrix[mRow+2].slice(mCol, mCol+3)];
    return newBox[0].concat(newBox[1], newBox[2]);
}