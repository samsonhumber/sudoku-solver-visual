import '@testing-library/jest-dom';
import solver from './lib/solver';
//import { describe } from 'jest';

describe('Tests for solver difficulty 0', () => {
    test('Expect an input of incomplete, valid sudoku to return same sudoku and success false', () => {
        //ARRANGE
        const toyGrid = [
            [5,3,4,6,7,8,9,1,2],
            [6,7,2,1,9,5,3,4,8], 
            [1,9,8,3,4,2,5,6,7], 
            [8,5,9,7,6,1,4,2,3], 
            [4,2,6,8,5,3,7,9,1], 
            [7,1,3,9,2,4,8,5,6], 
            [9,6,1,5,3,7,2,8,4], 
            [2,8,7,4,1,9,6,3,5], 
            [3,4,5,2,0,6,1,7,9]];
        const actual = solver(toyGrid, 0);
        //ACT
        const expected = {success: false, payload: toyGrid}; 
        //ASSERT
        expect(actual).toEqual(expected);
    });

    test('Expect an input of comlpeted, invalid sudoku to return same sudoku and success false', () => {
        //ARRANGE
        const toyGrid = [
            [1,3,4,6,7,8,9,5,2],
            [6,7,2,5,9,1,3,4,8], 
            [5,9,8,3,4,2,1,6,7], 
            [8,1,9,7,6,5,4,2,3], 
            [4,2,6,8,5,3,7,9,1], 
            [7,5,3,9,2,4,8,1,6], 
            [9,6,5,1,3,7,2,8,4], 
            [2,8,7,4,1,9,6,3,5], 
            [3,4,1,2,8,6,5,7,9]];
        const actual = solver(toyGrid, 0);
        //ACT
        const expected = {success: false, payload: toyGrid}; 
        //ASSERT
        expect(actual).toEqual(expected);
    })
    
    test('Expect an input of comlpeted, valid sudoku to return same sudoku and success true', () => {
        //ARRANGE
        const toyGrid = [
            [5,3,4,6,7,8,9,1,2],
            [6,7,2,1,9,5,3,4,8], 
            [1,9,8,3,4,2,5,6,7], 
            [8,5,9,7,6,1,4,2,3], 
            [4,2,6,8,5,3,7,9,1], 
            [7,1,3,9,2,4,8,5,6], 
            [9,6,1,5,3,7,2,8,4], 
            [2,8,7,4,1,9,6,3,5], 
            [3,4,5,2,8,6,1,7,9]];
        const actual = solver(toyGrid, 0);
        //ACT
        const expected = {success: true, payload: toyGrid}; 
        //ASSERT
        expect(actual).toEqual(expected);
    });
})