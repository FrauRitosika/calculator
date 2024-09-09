import { describe, expect, test } from '@jest/globals';
import expressionExecute from '../calculate';

describe('multiplying two negative numbers results in a positive number' , () => {
    test('-4.4 - 3.1 = -7.5', () => {
        expect(expressionExecute('-4.4 - 3.1')).toBe(-7.5);
    });
    test('--5 = 5', () => {
        expect(expressionExecute('--5')).toBe(5);
    });
    test('-+-5 --(10-5) = 10', () => {
        expect(expressionExecute('-+-5 --(10-5)')).toBe(10);
    });
})