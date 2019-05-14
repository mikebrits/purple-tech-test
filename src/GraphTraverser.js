import {findEmptyNodes} from './functions';
import WorkerManager from './WorkerManager';

export const traverseGraph = (forward, backward, workerCount = 0, baseTime = 60) => {

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
    // console.log("-" + order);
    return totalTime; 
};

// const logHeaders = workerCount => {
//     let output = 'Second';
//     for (let i = 0; i < workerCount; i++) {
//         output += '\t\tWorker ' + (i + 1);
//     }
//     output += '\t\tDone\n';
//     console.log(output);
// };

// const logValues = (manager, order, totalTime) => {
//     let output = '';
//     output += totalTime + ' \t\t';
//     manager.workers.forEach(worker => {
//         output += worker.currentStep || '.';
//         output += '\t\t';
//     });
//     output += order + '\n';
//     console.log(output);
// };