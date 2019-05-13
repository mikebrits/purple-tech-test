import { INIT_MANAGER, ASSIGN_STEP, WORK, INIT_GRAPH, REMOVE_NODE, NODE_COMPLETE, RESET_WORKER } from './actionsTypes';

// Manager and Workers
export const initManager = (workerCount, onWorkerComplete) => ({
    type: INIT_MANAGER,
    payload: {
        workerCount, onWorkerComplete
    }
});

export const assignStep = (step) => ({
    type: ASSIGN_STEP,
    payload: step
});

export const work = () => ({
    type: WORK
});

export const resetWorker = (id) => ({
    type: RESET_WORKER,
    payload: id
});


// Graph 
export const initGraph = (input) => ({
    type: INIT_GRAPH,
    payload: input
});

export const removeNode = (node) => ({
    type: REMOVE_NODE,
    payload: node
});

export const completeNode = (node) => ({
    type: NODE_COMPLETE,
    payload: node
});