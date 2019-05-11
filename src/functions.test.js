import {
    parseInput,
    splitInputToPairs,
    findStepOrder,
    getStepValue,
} from './functions';

describe('Dependecy Graph Generator', () => {

    it('Parses input sentences to variable pairs', () => {
        const input =
            'Step Q must be finished before step Y can begin. \n' +
            'Step V must be finished before step W can begin.';
        const pairs = splitInputToPairs(input);
        expect(pairs).toEqual([['Q', 'Y'], ['V', 'W']]);
    });

    it('Correctly generates a forwards and backwards dependency graph', () => {
        const input =
            'Step A must be finished before step B can begin.\n' +
            'Step A must be finished before step C can begin.\n' +
            'Step B must be finished before step C can begin.';

        const [forward, backward] = parseInput(input);

        expect(forward).toStrictEqual({
            B: ['A'],
            A: [],
            C: ['A', 'B'],
        });

        expect(backward).toStrictEqual({
            A: ['B', 'C'],
            B: ['C'],
            C: [],
        });
    });
});



test('get step value', () => {
    expect(getStepValue('A')).toBe(61);
    expect(getStepValue('Z')).toBe(86);
});
