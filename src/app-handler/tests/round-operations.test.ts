
import { describe, expect, test } from '@jest/globals';
import expressionExecute from '../calculate';
import settings from '../calculate-settings.json';

describe('operations with rounding', () => {
    test('4.4 - 3.1 = 1.3', () => {
        expect(expressionExecute('4.4 - 3.1')).toBe(1.3);
    });
    test('1.14 * 1.14 * 1.14 * 1.14 = 1.68896016', () => {
        expect(expressionExecute('1.14 * 1.14 * 1.14 * 1.14')).toBe(Number(1.68896016.toFixed(settings.fixedCount ?? 2)));
    });
    test('0.1 + 0.2 = 0.3', () => {
        expect(expressionExecute('0.1 + 0.2')).toBe(0.3);
    });
    test('0.28 + 0.14 = 0.42', () => {
        expect(expressionExecute('0.28 + 0.14')).toBe(0.42);
    });
});

