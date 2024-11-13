// gameUtils.test.js
import { generateSequence } from '../features/game/domain/use_cases/generateNewSequence.ts';

// Mock data for SimonItem values
const validSimonItems = ['R', 'B', 'G', 'Y'];

describe('generateSequence', () => {
    // Mocking generateRandomItem to ensure it returns predictable values
    beforeAll(() => {
        //jest.spyOn(global.Math, 'random').mockImplementation(() => 0.25);
    });

    afterAll(() => {
        //jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('should return an array of the specified length', () => {
        const length = 5;
        const sequence = generateSequence(length);
        expect(sequence).toHaveLength(length);
    });

    it('should return an empty array when length is 0', () => {
        const length = 0;
        const sequence = generateSequence(length);
        expect(sequence).toHaveLength(0);
    });

    it('should only contain valid SimonItem values', () => {
        const length = 10;
        const sequence = generateSequence(length);
        sequence.forEach(item => {
            expect(validSimonItems).toContain(item);
        });
    });

    it('should generate a new sequence each time', () => {
        const length = 3;
        const sequence1 = generateSequence(length);
        const sequence2 = generateSequence(length);
        expect(sequence1).not.toEqual(sequence2);
    });
});
