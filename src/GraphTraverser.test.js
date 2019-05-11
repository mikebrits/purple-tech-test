// /* eslint-disable no-undef */
import { findEmptyNodes, parseInput, findGraphExecutionTime } from './functions';
import { traverseGraph } from './GraphTraverser';

describe('Dependency Graph Traverser', () => {
    it('Handles empty input', () => {
        const output = findGraphExecutionTime('');
        expect(output).toBe(0);
    });

    it('Finds the next node to traverse, and orders them alphabetically', () => {
        const input =
            'Step D must be finished before step E can begin.\n' +
            'Step A must be finished before step C can begin.\n' +
            'Step B must be finished before step C can begin.\n' +
            'Step A must be finished before step B can begin.';

        const [forward, backward] = parseInput(input);

        // We shouldnt be looking backwards, but because the data structure
        // is the same, it's a good test. Plus forwards is desc alphabetical
        // and backward is asc alphabetical
        expect(findEmptyNodes(forward)).toEqual(['A', 'D']);
        expect(findEmptyNodes(backward)).toEqual(['C', 'E']);
    });

    it('Outputs steps in the right order', () => {
        const input =
            'Step D must be finished before step E can begin.\n' +
            'Step A must be finished before step C can begin.\n' +
            'Step B must be finished before step C can begin.\n' +
            'Step A must be finished before step B can begin.';

        let [forward, backward] = parseInput(input);
        const output = traverseGraph(forward, backward, 0, 0);

        expect(output).toBe(1 + 2 + 3 + 4 + 5);
    });

    it('Outputs steps in the right order - example', () => {
        const input =
            'Step C must be finished before step A can begin.\n' +
            'Step C must be finished before step F can begin.\n' +
            'Step A must be finished before step B can begin.\n' +
            'Step A must be finished before step D can begin.\n' +
            'Step B must be finished before step E can begin.\n' +
            'Step D must be finished before step E can begin.\n' +
            'Step F must be finished before step E can begin.';

        let [forward, backward] = parseInput(input);
        const output = traverseGraph(forward, backward, 1, 0);

        expect(output).toBe(15);
    });

    // This was not part of the requirement, but given enough time, eventually there would be
    // bugs that pop up because there is no requirement to track circular references.
    it('Bonus: Detects circular references', () => {
        const input =
            'Step A must be finished before step B can begin.\n' +
            'Step B must be finished before step C can begin.\n' +
            'Step X must be finished before step A can begin.\n' +
            'Step C must be finished before step A can begin.';

        let [forward, backward] = parseInput(input);
        expect(() => traverseGraph(forward, backward, 1, 0)).toThrow('Circular Reference Detected');
    });
});
