
import { describe, expect, test } from '@jest/globals';
import expressionExecute from '../calculate';

describe('operations with integers', () => {
    test('2 + 2 = 4', () => {
        expect(expressionExecute('2+2')).toBe(4);
    });
    test('2 * 2 = 4', () => {
        expect(expressionExecute('2*2')).toBe(4);
    });
    test('4 / 2 = 2', () => {
        expect(expressionExecute('4 / 2')).toBe(2);
    });
    test('4 / 2 + 1 = 3', () => {
        expect(expressionExecute('4 / 2 + 1')).toBe(3);
    });
    test('4 / 2 + 1 - (9 - 9) = 3', () => {
        expect(expressionExecute('4 / 2 + 1 - (9 - 9)')).toBe(3);
    });
    test('4 + 1 / 2 = 4.5', () => {
        expect(expressionExecute('4 + 1 / 2')).toBe(4.5);
    });
    test('4/4 + 1 / 2 + 1 = 2.1', () => {
        expect(expressionExecute('4/4 + 1 / 2 + 1')).toBe(2.5);
    });
    test('4.4/4 + 1.2 / 2 + 1 = 3', () => {
        expect(expressionExecute('4.4/4 + 1.2 / 2 + 1')).toBe(2.7);
    });
    test('√81 = 9', () => {
        expect(expressionExecute('√81')).toBe(9);
    });
    test('√(80+1) = 9', () => {
        expect(expressionExecute('√(80+1)')).toBe(9);
    });
    test('√(80+√1) = 9', () => {
        expect(expressionExecute('√(80+√1)')).toBe(9);
    });
    test('√√81 = 3', () => {
        expect(expressionExecute('√√81')).toBe(3);
    });
    test('√√81 + √√(80+√1) = 6', () => {
        expect(expressionExecute('√√81 + √√(80+√1)')).toBe(6);
    });
    test('2√25 = 10', () => {
        expect(expressionExecute('2√25')).toBe(10);
    });
    test('4% = 0.04', () => {
        expect(expressionExecute('4%')).toBe(0.04);
    });
    test('100% + 4% = 1.04', () => {
        expect(expressionExecute('100% + 4%')).toBe(1.04);
    });
    test('100%% = 0.01', () => {
        expect(expressionExecute('100%%')).toBe(0.01);
    });
});

