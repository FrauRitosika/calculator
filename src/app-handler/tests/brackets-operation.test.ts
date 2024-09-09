import { describe, expect, test } from '@jest/globals';
import expressionExecute from '../calculate';
import { ValidationExpressionError } from '../errors';

describe('' , () => {
    test('-5(10-5)', () => {
        expect(() => expressionExecute('-5(10-5)')).toThrow(ValidationExpressionError);
    });
    test('10%7 + 9', () => {
        expect(() => expressionExecute('10%7 + 9')).toThrow(ValidationExpressionError);
    });

})