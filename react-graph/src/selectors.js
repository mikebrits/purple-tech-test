import _ from 'lodash';

export const getGraph = state => state.graph;
export const getEmptyNodes = ({ graph }) =>
    Object.keys(graph.forward)
        .filter(item => graph.forward[item].length === 0)
        .sort();

export const managerBusy = state => state.manager.isBusy;
export const managerInitialised = state => state.manager.initialised;
export const getWorkers = state => state.manager.workers;
export const getFreeWorkers = state => state.manager.workers.filter(worker => worker.ready);
export const getWorkerById = id => state => _.find(state.manager.workers, { id });
export const getWorkersJustFinished = state => _.filter(state.manager.workers, { timeRemaining: 0 });
