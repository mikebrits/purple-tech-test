import fs from 'fs';
import Worker from './Worker';
import WorkerManager from './WorkerManager';

export const readFile = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const findStepOrder = contents => {
    let [forward, backward] = parseInput(contents);
    const output = traversePath(forward, backward, 5, 60);
    return output;
};

export const parseInput = input => {
    const pairs = splitInputToPairs(input);
    // Object listing dependencies
    // {A : ["B"], C: ["B"]} means that A and C depend on B being complete
    let forward = {};

    // Dependency tracker - inverse of forward
    // {B : ["A", "C"]} means B is a required step for A and C
    // This is useful because when we mark a step complete, we don't
    // want to have to traverse the object and the arrays within to find
    // and remove the dependency, we can simply refer to B, and know we need
    // to remove B from the forward of A and C.
    let backward = {};

    // Do as much as you can in a single iteration
    pairs.forEach(([a, b]) => {
        // Check if the element exists, if it does, add it to the array, if not
        // create the array with that one element in it
        // ES6 / React-y inline statement way:
        forward[b] = forward[b] ? [...forward[b], a] : [a];
        // Cleaner to read for beginners:
        if (backward[a]) {
            backward[a] = [...backward[a], b];
        } else {
            backward[a] = [b];
        }

        // Make sure we add the indices for all encountered nodes
        // This ensures that we have a start point, as these may look
        // like {F : []} in the forward
        forward[a] = forward[a] || [];
        backward[b] = backward[b] || [];
    });

    // Because we are returning two objects, they are returned in an array
    // This could also be returned in an object, but gives us less flexible
    // or more tedious naming conventions wherever we use it.
    // Plus this is standard in React hooks now, so hey, let's flaunt it.
    return [forward, backward];
};

export const findEmptyNodes = graph => {
    // Find all the keys who have an empty array, and sort them alphabetically
    return Object.keys(graph)
        .filter(item => graph[item].length === 0)
        .sort();
};

// "Step C must be finished before step W can begin." => [["C", "W"]]
export const splitInputToPairs = input => {
    // First, break the input into lines
    const pairs = input.split('\n').map(item => {
        // Turn each line into an array of words
        const arr = item.split(' ');
        // This feels a little hacky. It will work perfectly for the data source
        // provided, but if the steps went into double digits e.g. AA then this approach
        // would fall over. A better way would probably be to have some kind of fancy regex
        // on the string. But at that point I'd just be showing off my google skills.
        return [arr[1], arr[7]];
    });

    return pairs;
};

export const traversePath = (forward, backward, workerCount = 0, baseTime = 60) => {
    let emptyNodes = findEmptyNodes(forward);
    const totalNodes = Object.keys(forward).length;
    let totalTime = 0;

    // logHeaders(workerCount + 1);

    // Because we will be deleting items, let's not modify the original
    let forwardCopy = { ...forward };
    let order = '';

    const completeStep = step => {
        // We now need to inform all the steps that depended on this one
        const dependencies = backward[step];

        // Instead of traversing the whole forward map, we use the backward map
        // to inform us of where to update the forward map. Saves loads of iteration.
        dependencies.forEach(dep => {
            // Because we are using a filter here, rather than a splice, we are
            // removing any duplicate links in the process.
            forwardCopy[dep] = forwardCopy[dep].filter(item => item !== step);
        });
        order += step;
    };

    const manager = new WorkerManager(workerCount, completeStep, baseTime);

    // This could just as well have been recursive. 6 of 1.
    // manager.isBusy() catches the last element to be processed.
    while (emptyNodes.length || manager.isBusy()) {
        for (let i = 0; i < emptyNodes.length; i++) {
            if (manager.assignStep(emptyNodes[i])) {
                //It is being worked on now, so remove it so that
                // it no longer turns up in the empty nodes list
                delete forwardCopy[emptyNodes[i]];
            }
        }
        manager.work();

        // logValues(manager, order, totalTime);

        emptyNodes = findEmptyNodes(forwardCopy);
        totalTime ++;
    }

    // This is a primitive way of spotting a circular reference.
    // The error does not tell us where the circular reference is.
    if (order && order.length < totalNodes) {
        throw 'Circular Reference Detected';
    }
    return totalTime; 
};

const logHeaders = workerCount => {
    let output = 'Second';
    for (let i = 0; i < workerCount; i++) {
        output += '\t\tWorker ' + (i + 1);
    }
    output += '\t\tDone\n';
    console.log(output);
};

const logValues = (manager, order, totalTime) => {
    let output = '';
    output += totalTime + ' \t\t';
    manager.workers.forEach(worker => {
        output += worker.currentStep || '.';
        output += '\t\t';
    });
    output += order + '\n';
    console.log(output);
};

export const getStepValue = (char, base = 60) => char.charCodeAt(0) - 65 + 1 + base;

export const manageWorkers = numberOfWorkers => {
    const handleStepComplete = () => {};
    function WorkerBench() {
        let workers = new Array(numberOfWorkers + 1).fill(new Worker(handleStepComplete));
    }

    WorkerBench.prototype.getFreeWorker = () => {
        console.log('pew');
    };

    return WorkerBench;
};
