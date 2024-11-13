import {it} from '@jest/globals';
import {testCurrentSequence} from '../features/game/domain/use_cases/testCurrentSequence.ts';
import {SimonItem} from '../general/types/SimonItem.ts';

describe('testCurrentSequence', () => {
    it('should return "Finish" when user sequence fully matches the current sequence', () => {
        const userSequence: SimonItem[] = ['R', 'B', 'G'];
        const currentSequence: SimonItem[] = ['R', 'B', 'G'];
        expect(testCurrentSequence(userSequence, currentSequence)).toBe('Finish');
    });

    it('should return "Correct" when user sequence is a partial match of the current sequence', () => {
        const userSequence: SimonItem[]  = ['R', 'B'];
        const currentSequence: SimonItem[]  = ['R', 'B', 'G'];
        expect(testCurrentSequence(userSequence, currentSequence)).toBe('Correct');
    });

    it('should return "Incorrect" when user sequence does not match the current sequence', () => {
        const userSequence: SimonItem[]  = ['R', 'G'];
        const currentSequence: SimonItem[]  = ['R', 'B', 'G'];
        expect(testCurrentSequence(userSequence, currentSequence)).toBe('Incorrect');
    });

    it('should return "Incorrect" if user sequence is longer than current sequence', () => {
        const userSequence: SimonItem[]  = ['R', 'B', 'G', 'Y'];
        const currentSequence: SimonItem[]  = ['R', 'B', 'G'];
        expect(testCurrentSequence(userSequence, currentSequence)).toBe('Incorrect');
    });

    it('should return "Correct" if user sequence is empty and current sequence is non-empty', () => {
        const userSequence: SimonItem[]  = [];
        const currentSequence: SimonItem[]  = ['R', 'B', 'G'];
        expect(testCurrentSequence(userSequence, currentSequence)).toBe('Correct');
    });

    it('should return "Finish" if both user sequence and current sequence are empty', () => {
        const userSequence: SimonItem[]  = [];
        const currentSequence: SimonItem[]  = [];
        expect(testCurrentSequence(userSequence, currentSequence)).toBe('Finish');
    });
});


