export default function solver (raw_grid: Array<Array<number>>, difficulty: number) {
    /* Construction notes
    - The difficulty only works for 0, we want to see if it is a completed valid sudoku first
    - Difficulty of 1 should also fill in 'all-but-one' values
    */
    type SudokuReturnType = {
        success: boolean,
        payload: Array<Array<number>>
    }
    const new_grid: Array<Array<number>> = [...raw_grid];
    const sudResult: SudokuReturnType = {success: true, payload: []};
    //const oneToNine: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //const zeroToNine: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let counter = 0;
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
        case 1:
            counter += setCounter(new_grid);
            //const new_grid: Array<Array<number>> = [...raw_grid];
            /*
            for(let i=0; i<9; i++){
                //sudResult.payload.push(raw_grid[i]);
                counter += new_grid[i].reduce((total: number, num: number) => {return num === 0 ? total + 1 : total;}, 0);
                for(let j=0; j<9; j++) {
                    if (new_grid[i][j] === 0) {
                        const newEntry = allButOne(new_grid, i, j);
                        if(newEntry !== 0) {
                            counter --;
                            //console.log('Counter is now', counter);
                        }
                        console.log('At', i, j, 'has new entry to the grid of', newEntry);
                        new_grid[i][j] = newEntry;
                    } else {
                        //console.log('Move on')
                    }
                }
            }
            */
            while(counter > 0) {
                for(let i=0; i<9; i++){
                    //sudResult.payload.push(raw_grid[i]);
                    //counter += new_grid[i].reduce((total: number, num: number) => {return num === 0 ? total + 1 : total;}, 0);
                    for(let j=0; j<9; j++) {
                        if (new_grid[i][j] === 0) {
                            const newEntry = allButOne(new_grid, i, j);
                            if(newEntry !== 0) {
                                counter --;
                                //console.log('Counter is now', counter);
                            }
                            console.log('At', i, j, 'has new entry to the grid of', newEntry);
                            new_grid[i][j] = newEntry;
                        } else {
                            //console.log('Move on')
                        }
                    }
                }
            };
            console.log(new_grid);
            return {success: true, payload: new_grid};
            break; 
        case 2:
            counter += setCounter(new_grid);
            while(counter > 0) {
                for(let i=0; i<9; i++){
                    for(let j=0; j<9; j++) {
                        if (new_grid[i][j] === 0) {
                            const newEntry = gentleFitter(new_grid, i, j);
                            if(newEntry !== 0) {
                                counter --;
                                //console.log('Counter is now', counter);
                            }
                            console.log('At', i, j, 'has new entry to the grid of', newEntry);
                            new_grid[i][j] = newEntry;
                        } else {
                            //console.log('Move on')
                        }
                    }
                }
            };
            break;   
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

function setCounter(matrix: Array<Array<number>>) {
    let counterAdded = 0;
    for (let i=0; i<9; i++) {
        counterAdded += matrix[i].reduce((total: number, num: number) => {return num === 0 ? total + 1 : total;}, 0);
    }
    return counterAdded;
}

function allButOne(matrix: Array<Array<number>>, indexI: number, indexJ: number) {
    const oneToNine: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const uniqueRow = [...new Set(matrix[indexI])];
    const uniqueCol = [...new Set(matrix.map((row) => {return row[indexJ]}))];
    const uniqueBox = [...new Set(grabBox(matrix, 3*Math.floor(indexI/3)+Math.floor(indexJ/3)))];
    if (uniqueRow.length === 9) {
        const newEntry = [...oneToNine.filter((item: number) => {return !uniqueRow.includes(item)})];
        //console.log('Found', newEntry, 'based on row');
        return newEntry[0];
    } else if (uniqueCol.length ===9) {
        const newEntry = [...oneToNine.filter((item: number) => {return !uniqueCol.includes(item)})];
        //console.log('Found', newEntry, 'based on column');
        return newEntry[0];
    } else if (uniqueBox.length === 9) {
        const newEntry = [...oneToNine.filter((item: number) => {return !uniqueBox.includes(item)})];
        //console.log('Found', newEntry, 'based on box', uniqueBox);
        return newEntry[0];
    } else{
        //console.log('Cannot be found right now');
        return 0;
    }
}

function gentleFitterCalculator(matrix: Array<Array<number>>, indexI: number, indexJ: number) {
    /* Gentle thing calculator plan
    - We assume that the number is not currently filled
    - A human will solve this by seeing the numbers in other rows and columns as blockers
      - So a successful output is either a fail, or a a success with the correct number, the columns used, and the rows used
      - Now we don't have to solve it this way, but we do need to show how a user will solve it
      - There may be a quicker wy involving rearranging the grid dynamically to put the optimal positions at the top
        - But I would need to improve my maths to do this!
    - An input can be the box, the 3 rows, the 3 columns, and a number for the element checked
    - Therefore, we loop through 1-9 to check for possibility of that number to fill gap
      - We can check if that number is already in own box, own row or own column - if so then skip
      - If not, then we go through the the other gaps in box to see if this number fits those
        - Note down the columns and rows in which the number is found as you go
      - If one gap doesn't have that number in own row or column, then skip
        - Reset the recordings for rows and columns here.
      - If it does, then record that row or column
      - If all do, then record that number - it is the number to fit the gap!
    - Return the number, and the rows/columns that contributed to the decision
        - As an aside, a better order to go through sudoku boxes than 0-8 is [0, 1, 2, 5, 3, 4, 7, 8, 6]
          - This is because new entries from the previous box can help solve gaps in the next
    */
}

function gentleFitter(matrix: Array<Array<number>>, indexI: number, indexJ: number) {
    const oneToNine: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const thisBox = grabBox(matrix, 3*Math.floor(indexI/3)+Math.floor(indexJ/3));
    const thisI = indexI%3 + 3*indexJ%3;
    const numbersInBox = thisBox.filter((num) => {return num>0});
    for(let i=0; i<9; i++) {
        if(thisBox[i] === 0 && i !== thisI) {
            for(let j=0; j<9; j++) {
                if(!numbersInBox.includes(j)) {
                    console.log(j);
                }
            }
        }
    }
    return 0;
}